import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import Form from 'src/@core/components/apps/register-customer/components/Form'
import { DrawerHeader } from 'src/@core/components/common/DrawerHeader'
import { useCustomers } from 'src/@core/hooks/apps/useCustomerRegistration'

const Page = () => {
  const {
    query: { id }
  } = useRouter()

  const { form } = useCustomers(id as string)

  return (
    <>
      <DrawerHeader>
        <Typography variant='h6'>{!id ? 'Add Customer' : 'Update Customer'}</Typography>
      </DrawerHeader>
      <Form serviceId={id as string} />
    </>
  )
}

export async function getServerSideProps() {
  return {
    props: {}
  }
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'customer-registration-page'
}

export default Page
