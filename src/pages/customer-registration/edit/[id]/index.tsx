// ** React & Next Imports
import { Fragment } from 'react'
import { useRouter } from 'next/router'

// ** Mui Imports
import { Typography } from '@mui/material'

// ** Custom Components Import
import Form from 'src/@core/components/apps/register-customer/components/Form'

const Page = () => {
  // Getting Id From The Params
  const {
    query: { id }
  } = useRouter()

  return (
    <Fragment>
      <Typography variant='h5' textAlign={'center'}>
        Update Customer
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
  subject: 'customer-registration-page'
}

export default Page
