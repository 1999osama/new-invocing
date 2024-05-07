import * as React from 'react'

// ** MUI Imports
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import { CircularProgress, Grid, TextField, Paper, Typography } from '@mui/material'

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
          <Paper elevation={2} sx={{ padding: '10px', marginTop: '8px', width: '100%' }}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12}>
                <Typography variant='h6' gutterBottom>
                  Customer Info
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <InputField
                  name='name'
                  label='Practice Name'
                  placeholder='Practice Name'
                  type='text'
                  control={control}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <InputField
                  name='vendor'
                  label='Authorized Official Name'
                  placeholder='Authorized Official Name'
                  type='text'
                  control={control}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <InputField name='email' label='Enter Email' placeholder='Enter Email' type='email' control={control} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  name='address'
                  label='Practice Billing Address'
                  placeholder='Practice Billing Address'
                  type='text'
                  control={control}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  name='contactNumber'
                  label='Contact Number'
                  placeholder='Contact Number'
                  type='text'
                  control={control}
                />
              </Grid>
            </Grid>
          </Paper>
          <Paper elevation={2} sx={{ padding: '10px', marginTop: '8px', width: '100%' }}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12}>
                <Typography variant='h6' gutterBottom>
                  For Wire/ACH -
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField name='wireCode' label='Wire Code' placeholder='Wire Code' type='text' control={control} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  name='routingNumber'
                  label='Routing Number'
                  placeholder='Routing Number'
                  type='text'
                  control={control}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  name='swiftCode'
                  label='Swift Code'
                  placeholder='Swift Code'
                  type='text'
                  control={control}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField name='title' label='Title' placeholder='Title' type='text' control={control} />
              </Grid>
            </Grid>
          </Paper>
          <Paper elevation={2} sx={{ padding: '10px', marginTop: '8px', width: '100%' }}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12}>
                <Typography variant='h6' gutterBottom>
                  Credit Card Merchant Name
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  name='merchantName1'
                  label='Merchant Name 1'
                  placeholder='Merchant Name 1'
                  type='text'
                  control={control}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  name='merchantName2'
                  label='Merchant Name 2'
                  placeholder='Merchant Name 2'
                  type='text'
                  control={control}
                />
              </Grid>
            </Grid>
          </Paper>
          <Paper elevation={2} sx={{ padding: '10px', marginTop: '8px', width: '100%' }}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12}>
                <Typography variant='h6' gutterBottom>
                  For Paper Checks -
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField name='bankName' label='Bank Name' placeholder='Bank Name' type='text' control={control} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  name='accountTitle'
                  label='Account Title'
                  placeholder='Account Title'
                  type='text'
                  control={control}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  name='accountNumber'
                  label='Account Number'
                  placeholder='Account Number'
                  type='text'
                  control={control}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  name='bankAddress'
                  label='Bank Address'
                  placeholder='Bank Address'
                  type='text'
                  control={control}
                />
              </Grid>
            </Grid>
          </Paper>
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
