// ** React & Next Imports
import { Fragment, useEffect } from 'react'
import { useRouter } from 'next/router'

// ** Mui Imports
import { Typography } from '@mui/material'

// ** Custom Components Import
import Form from 'src/@core/components/apps/invoices/components/Form'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { InvoiceSlice } from 'src/store/apps/invoices'

const Page = () => {
  // ** Hooks

  const dispatch = useDispatch<AppDispatch>()

  // Getting Id From The Params
  const {
    query: { id }
  } = useRouter()

  useEffect(() => {
    return () => {}
  }, [])

  return (
    <Fragment>
      <Typography variant='h5' textAlign={'center'}>
        Update Invoice
      </Typography>
      <Form serviceId={id as string} />
    </Fragment>
  )
}

// ** Server Side Rendering Page For The Specific Id
export async function getServerSideProps() {
  return {
    props: {}
  }
}

// ACL Implementation For Every Page
Page.acl = {
  action: 'itsHaveAccess',
  subject: 'invoices-page'
}

export default Page
