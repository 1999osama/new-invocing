import { Typography } from '@mui/material'
import React from 'react'
import Form from 'src/@core/components/apps/register-customer/components/Form'
import { DrawerHeader } from 'src/@core/components/common/DrawerHeader'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'

const Page = () => {
  const { serviceId } = useToggleDrawer()
  return (
    <>
      <DrawerHeader>
        <Typography variant='h6'>{!serviceId ? 'Add Customer' : 'Update Customer'}</Typography>
      </DrawerHeader>
      <Form serviceId={serviceId} />
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'customer-registration-page'
}

export default Page
