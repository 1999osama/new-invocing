// ** React Imports
import { useState, ElementType, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button, { ButtonProps } from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'

// Custom Hooks
import { useAuth } from 'src/hooks/useAuth'

// Services
import { fileService } from 'src/services'

// Custom Component
import { InputField } from 'src/@core/components/form'

// Third Party Imports
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Types
import { IUser } from 'src/types/apps/user'
import toast from 'react-hot-toast'

// Styled Components
const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(5),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(LoadingButton)<ButtonProps & { component?: ElementType; htmlFor?: string }>(
  ({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center'
    }
  })
)

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

// ** Profile Update Schema
const schema = yup.object().shape({
  first_name: yup.string().min(2),
  last_name: yup.string().min(2),
  profilePicture: yup.string()
})

const Page = () => {
  // ** Hooks
  const { user, profileUpdate, status } = useAuth()

  // ** Hook Form Default Values
  let defaultValues = {
    first_name: user?.first_name,
    last_name: user?.last_name,
    email: user?.email,
    profilePicture: user?.profilePicture
  }

  // ** Hook Form Configuration
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { touchedFields, dirtyFields, isDirty }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  // ** States
  const [imgSrc, setImgSrc] = useState<string>(user?.profilePicture || '/images/avatars/1.png')

  const [uploadingStatus, setUploadingStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')

  // ** OnChange Function
  const onChange = async (file: ChangeEvent) => {
    // const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      const formData = new FormData()
      formData.append('image', files[0])
      try {
        setUploadingStatus('pending')
        const { data } = await fileService.fileUpload(formData)
        if (data?.success) {
          setValue('profilePicture', data?.data?.secure_url)
          setUploadingStatus('success')
          setImgSrc(data?.data?.secure_url)
        }
      } catch (error: any) {
        toast.error(error?.message || error?.response?.data?.message || 'Upload Failed')
        setUploadingStatus('error')
      }
      // reader.onload = () => setImgSrc(reader.result as string)
      // reader.readAsDataURL(files[0])
    }
  }

  // ** Function For Profile Update
  function onSubmit(data: IUser) {
    setValue('email', user?.email)
    profileUpdate(data)
    reset(data);
    setUploadingStatus('idle');
  }

  return (
    <CardContent
      sx={{
        boxShadow: 'rgba(76, 78, 100, 0.22) 0px 10px 10px 10px',
        borderRadius: 1.5
      }}
    >
      {Object.keys(touchedFields).some((field) => (dirtyFields as Record<string, boolean>)[field]) || uploadingStatus === 'success' ? (
        <Typography variant='caption' color='warning.main'>
          The form has unsaved changes.
        </Typography>
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={6}>
          <Grid item xs={12} sx={{ my: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled
                  component='label'
                  variant='contained'
                  htmlFor='account-settings-upload-image'
                  loadingPosition='end'
                  loading={uploadingStatus === 'pending'}
                  disabled={uploadingStatus === 'pending' || uploadingStatus === 'success'}
                >
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled
                  color='error'
                  variant='outlined'
                  onClick={() => {
                    setImgSrc(user?.profilePicture || '/images/avatars/1.png')
                    setValue('profilePicture', user?.profilePicture || null)
                    setUploadingStatus('idle')
                  }}
                  disabled={uploadingStatus === 'idle'}
                >
                  Reset
                </ResetButtonStyled>
                <Typography sx={{ mt: 4 }} component='p' variant='caption'>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              type='text'
              fullWidth
              name='first_name'
              label='First Name'
              placeholder='Enter First Name'
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              type='text'
              fullWidth
              name='last_name'
              label='Last Name'
              placeholder='Enter Last Name'
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              type='email'
              fullWidth
              name='email'
              label='Email'
              placeholder='Enter Email'
              control={control}
              disabled
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select label='Role' defaultValue='admin'>
                <MenuItem value='admin'>Admin</MenuItem>
                <MenuItem value='author'>Author</MenuItem>
                <MenuItem value='editor'>Editor</MenuItem>
                <MenuItem value='maintainer'>Maintainer</MenuItem>
                <MenuItem value='subscriber'>Subscriber</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select label='Status' defaultValue='active'>
                <MenuItem value='active'>Active</MenuItem>
                <MenuItem value='inactive'>Inactive</MenuItem>
                <MenuItem value='pending'>Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
          {/* <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Company'
              placeholder='TechMatter Pvt. Ltd.'
              defaultValue='TechMatter Pvt. Ltd.'
            />
          </Grid> */}
          <Grid item xs={12}>
            <LoadingButton
              variant='contained'
              sx={{ mr: 4 }}
              type='submit'
              loadingPosition='end'
              loading={uploadingStatus === 'pending' || status === 'pending'}
              disabled={
                uploadingStatus === 'pending' ||
                status === 'pending' ||
                (!Object.keys(touchedFields).some(field => (dirtyFields as Record<string, boolean>)[field]) && uploadingStatus !== 'success')
              }
            >
              Save Changes
            </LoadingButton>
            {/* <Button type='reset' variant='outlined' color='secondary'>
              Reset
            </Button> */}
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'settings-profile-page'
}

export default Page
