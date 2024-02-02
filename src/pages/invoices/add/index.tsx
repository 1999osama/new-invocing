// ** React Import
import React, { Fragment, useEffect } from 'react'

// ** Mui Import
import { Typography } from '@mui/material'
import Form from 'src/@core/components/apps/invoices/components/Form'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { InvoiceSlice } from 'src/store/apps/invoices'

const Page = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(InvoiceSlice.actions.handleEmptyEntities())
    dispatch(InvoiceSlice.actions.handleEmptyEntity())
    return () => {}
  }, [])

  return (
    <Fragment>
      <Typography variant='h5' textAlign={'center'}>
        Add Invoices
      </Typography>
      <Form serviceId={null} />
    </Fragment>
  )
}

// ACL Implementation For Every Page
Page.acl = {
  action: 'itsHaveAccess',
  subject: 'invoices-page'
}

export default Page
