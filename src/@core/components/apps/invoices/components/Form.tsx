import * as React from 'react'

// ** MUI Imports
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'

// ** Third Party Imports
import { useInvoice } from 'src/@core/hooks/apps/useInvoice'

// ** import form support components
import { InputField } from 'src/@core/components/form'

// ** Types Imports
import { CircularProgress, Grid, TextField } from '@mui/material'
import { DrawerFooter } from 'src/@core/components/common/DrawerFooter'

interface Props {
  serviceId: string | null
  onClose?: () => void
}

const Form: React.FC<Props> = ({ serviceId, onClose }) => {
  // ** Hooks
  const {
    form: {
      control,
      reset,
      handleSubmit,
      formState: { errors },
      setValue,
      getValues
    },
    addInvoice,
    updateInvoice,
    store
  } = useInvoice(serviceId)

  const onSubmit = async (data: any) => {
    if (serviceId) {
      await updateInvoice(serviceId, data)
    } else {
      await addInvoice(data)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ p: 5 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <InputField
              name='title'
              label='Company Title'
              placeholder='Enter Company Title'
              type='text'
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField name='total' label='Total' placeholder='Enter Total' type='number' control={control} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              sx={{ width: '100%' }}
              id='issued-date'
              label='Issued Date'
              type='datetime-local'
              color='secondary'
              // value={new Date()}
              onChange={(e: any) => setValue('issuedDate', e.target.value)}
              // inputProps={{
              // min: new Date().toISOString().slice(0, 16),
              // max: maxDateTime.toISOString().slice(0, 16)
              // }}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField name='balance' label='Balance' placeholder='Enter Balance' type='number' control={control} />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <InputField name='order' label='order' placeholder='Enter order' type='number' control={control} />
          </Grid> */}
        </Grid>
      </Box>
      <DrawerFooter sx={{ position: 'absolute', bottom: '0', width: '100%' }}>
        <LoadingButton
          sx={{ mr: 3 }}
          loading={store.status === 'pending'}
          disabled={store.status === 'pending'}
          loadingPosition='end'
          size='large'
          variant='contained'
          type='submit'
          endIcon={store.status === 'pending' && <CircularProgress size={20} />}
        >
          Submit
        </LoadingButton>
      </DrawerFooter>
    </form>
  )
}

export default Form
