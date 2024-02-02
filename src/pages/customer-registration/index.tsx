// ** React && Next Import
import { useEffect, Fragment } from 'react'
import { useRouter } from 'next/router'

// ** Custom Components Import
import CustomerTable from 'src/@core/components/apps/register-customer/components/Table'
import TableHeader from 'src/@core/components/apps/register-customer/components/TableHeader'
import DeleteAlert from 'src/@core/components/common/deleteAlert'

// ** Custom Hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { useCustomers } from 'src/@core/hooks/apps/useCustomerRegistration'

// ** Types Import
import { ModalType } from 'src/types'

const Page = () => {
  // **  Custom Hooks
  const { serviceId } = useToggleDrawer()

  const { push } = useRouter()

  const { getCustomers, deleteCustomer, exportCustomers } = useCustomers(serviceId)

  // ** Component Mount Phase API Calling
  useEffect(() => {
    getCustomers({ query: {} })
  }, [])

  // ** Functions
  const handleDelete = () => {
    serviceId && deleteCustomer(serviceId)
  }

  return (
    <Fragment>
      <TableHeader
        value={''}
        handleFilter={() => {}}
        toggle={() => push(`/customer-registration/add`)}
        exportTable={() => exportCustomers()}
      />
      <CustomerTable />
      <DeleteAlert title='customer' type={ModalType.DEFAULT} onAgree={() => handleDelete()} />
    </Fragment>
  )
}

// ACL Implementation For Every Page
Page.acl = {
  action: 'itsHaveAccess',
  subject: 'customer-registration-page'
}

export default Page
