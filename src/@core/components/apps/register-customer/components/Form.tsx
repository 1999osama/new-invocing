import * as React from 'react'

// ** MUI Imports
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import { CircularProgress, Grid, TextField } from '@mui/material'

// ** Custom Hooks Imports
import { useCustomers } from 'src/@core/hooks/apps/useCustomerRegistration'

// ** import form support components
import { InputField } from 'src/@core/components/form'

// ** Types Imports
import { ICustomerRegister } from 'src/types/apps/customer-register'

// ** Custom Components Imports
import { DrawerFooter } from 'src/@core/components/common/DrawerFooter'

interface Props {
  serviceId: string | null
  onClose?: () => void
}

const Form: React.FC<Props> = ({ serviceId, onClose }) => {
  // ** Hooks
  const {
    form: { control, handleSubmit },
    addCustomer,
    updateCustomer,
    store
  } = useCustomers(serviceId)

  const onSubmit = async (data: ICustomerRegister) => {
    if (serviceId) {
      await updateCustomer(serviceId, data)
    } else {
      await addCustomer(data)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ p: 5 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <InputField name='name' label='Enter Name' placeholder='Enter Name' type='text' control={control} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField name='email' label='Enter Email' placeholder='Enter Email' type='email' control={control} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField name='vendor' label='Enter Vendor' placeholder='Enter Vendor' type='text' control={control} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name='address'
              label='Enter Address'
              placeholder='Enter Address'
              type='text'
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name='BDForWireCode'
              label='Enter BDForWireCode'
              placeholder='Enter BDForWireCode'
              type='number'
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name='BDForWireRouting'
              label='Enter BDForWireRouting'
              placeholder='Enter BDForWireRouting'
              type='number'
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name='BDForACHRouting'
              label='Enter BDForACHRouting'
              placeholder='Enter BDForACHRouting'
              type='number'
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name='BDForACHCode'
              label='Enter BDForACHCode'
              placeholder='Enter BDForACHCode'
              type='text'
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name='merchantName'
              label='Enter Merchant Name'
              placeholder='Enter merchantName'
              type='text'
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField name='title' label='Enter Title' placeholder='Enter title' type='text' control={control} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name='bankName'
              label='Enter Bank Name'
              placeholder='Enter Bank Name'
              type='text'
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name='accountTitle'
              label='Enter Account Title'
              placeholder='Enter Account Title'
              type='text'
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name='accountNumber'
              label='Enter Account Number'
              placeholder='Enter Account Number'
              type='text'
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name='bankAddress'
              label='Enter Bank Address'
              placeholder='Enter Bank Address'
              type='text'
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name='tax'
              label='Enter Tax Percent'
              placeholder='Enter Tax Percent'
              type='number'
              control={control}
            />
          </Grid>
        </Grid>
      </Box>
      <DrawerFooter sx={{ bottom: '0', width: '100%' }}>
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
          {store.status === 'pending' ? 'Please Wait' : 'Submit'}
        </LoadingButton>
      </DrawerFooter>
    </form>
  )
}

export default Form
