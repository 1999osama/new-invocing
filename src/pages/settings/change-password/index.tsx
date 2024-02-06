// ** React Imports
import { MouseEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import { FormHelperText, Grid2Props, Typography, styled, useTheme } from '@mui/material'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'

// ** Third Party Imports
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// ** Custom Hooks Import
import { useAuth } from 'src/hooks/useAuth'

// ** Types Import
import { ChangePasswordParams } from 'src/context/types'

interface State {
  newPassword: string
  currentPassword: string
  showNewPassword: boolean
  confirmNewPassword: string
  showCurrentPassword: boolean
  showConfirmNewPassword: boolean
}

const schema = yup.object().shape({
  oldPassword: yup.string().required('This field is required').min(2).max(30),
  newPassword: yup.string().required('This field is required').min(2).max(30),
  confirmPassword: yup
    .string()
    .required('This field is required')
    .min(2)
    .max(30)
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
})

const ImageContainer = styled(Grid)<Grid2Props>(({ theme }) => ({
  display: 'flex',
  mt: 2.5,
  alignItems: 'flex-end',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}))

const Page = () => {
  // ** States
  const [values, setValues] = useState<State>({
    newPassword: '',
    currentPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showCurrentPassword: false,
    showConfirmNewPassword: false
  })

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      oldPassword: values.newPassword,
      newPassword: values.newPassword,
      confirmPassword: values.newPassword
    },
    resolver: yupResolver(schema)
  })

  const { changeCredentials, user } = useAuth()

  const theme = useTheme()

  const handleMouseDownCurrentPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const onSubmit = (data: ChangePasswordParams) => {
    changeCredentials(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent
        sx={{
          boxShadow: 'rgba(76, 78, 100, 0.22) 0px 10px 10px 10px',
          borderRadius: 1.5
        }}
      >
        <Typography textAlign='center' mb={5} variant='h5'>
          Change Password
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CustomAvatar skin='light' sx={{ width: 90, height: 90, marginRight: theme.spacing(5) }} variant={'square'}>
            {getInitials(`${user?.firstName} ${user?.lastName}`).toUpperCase()}
          </CustomAvatar>
        </Box>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} sx={{ mt: 5, mb: [0, 6] }}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-current-password'>Current Password</InputLabel>
                  <Controller
                    name='oldPassword'
                    control={control}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <OutlinedInput
                        label='Current Password'
                        value={value}
                        id='account-settings-current-password'
                        type={values.showCurrentPassword ? 'text' : 'password'}
                        onChange={onChange}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              aria-label='toggle password visibility'
                              onClick={() => setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })}
                              onMouseDown={handleMouseDownCurrentPassword}
                            >
                              {values.showCurrentPassword ? <EyeOutline /> : <EyeOffOutline />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    )}
                  />
                  {errors.oldPassword && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.oldPassword.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-new-password'>New Password</InputLabel>
                  <Controller
                    name='newPassword'
                    control={control}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <OutlinedInput
                        label='New Password'
                        value={value}
                        type={values.showNewPassword ? 'text' : 'password'}
                        onChange={onChange}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              aria-label='toggle password visibility'
                              onClick={() => setValues({ ...values, showNewPassword: !values.showNewPassword })}
                              onMouseDown={handleMouseDownCurrentPassword}
                            >
                              {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    )}
                  />
                  {errors.newPassword && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.newPassword.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-confirm-new-password'>Confirm New Password</InputLabel>
                  <Controller
                    name='confirmPassword'
                    control={control}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <OutlinedInput
                        label='Confirm Password'
                        value={value}
                        type={values.showConfirmNewPassword ? 'text' : 'password'}
                        onChange={onChange}
                        error={Boolean(errors.confirmPassword)}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              aria-label='toggle password visibility'
                              onClick={() =>
                                setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
                              }
                              onMouseDown={handleMouseDownCurrentPassword}
                            >
                              {values.showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    )}
                  />
                  {errors.confirmPassword && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.confirmPassword.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <ImageContainer item sm={6} xs={12}>
            <img alt='avatar' src='/images/pages/account-settings-security-illustration.png' />
          </ImageContainer>
        </Grid>

        <Divider sx={{ mt: 0, mb: 6 }} />

        <Box>
          <Button variant='contained' sx={{ mr: 4 }} type='submit'>
            Save Changes
          </Button>
          <Button type='reset' variant='outlined' color='secondary' onClick={() => reset()}>
            Reset
          </Button>
        </Box>
      </CardContent>
    </form>
  )
}

// ACL Implementation For Every Page
Page.acl = {
  action: 'itsHaveAccess',
  subject: 'settings-change-password-page'
}

export default Page
