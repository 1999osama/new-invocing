// ** React Import
import React, { Fragment } from 'react'

// ** Mui Import
import { Typography } from '@mui/material'

// ** Custom Components Import
import Form from 'src/@core/components/apps/register-customer/components/Form'

// ** Custom Hooks Import
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'

const Page = () => {
  // ** Hooks
  const { serviceId } = useToggleDrawer()

  return (
    <Fragment>
      <Typography variant='h5' textAlign={'center'}>
        Add Customer
      </Typography>
      <Form serviceId={serviceId} />
    </Fragment>
  )
}

// ACL Implementation For Every Page
Page.acl = {
  action: 'itsHaveAccess',
  subject: 'customer-registration-page'
}

export default Page
