import { useEffect, Fragment } from 'react'
import CustomerTable from 'src/@core/components/apps/register-customer/components/Table'
import TableHeader from 'src/@core/components/apps/register-customer/components/TableHeader'
import CustomerDrawer from 'src/@core/components/apps/register-customer/components/Drawer'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import DeleteAlert from 'src/@core/components/common/deleteAlert'
import { ModalType } from 'src/types'
import { useCustomers } from 'src/@core/hooks/apps/useCustomerRegistration'
import { useRouter } from 'next/router'

const Page = () => {
  // **  Custom Hooks
  const { serviceId, isDrawerOpen, handleDrawer } = useToggleDrawer()

  const { push } = useRouter()

  const { getCustomers, deleteCustomer, exportCustomers, store } = useCustomers(serviceId)

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
      {/* <CustomerDrawer open={isDrawerOpen} serviceId={serviceId} toggle={() => handleDrawer(null)} /> */}
      <DeleteAlert title='customer' type={ModalType.DEFAULT} onAgree={() => handleDelete()} />
    </Fragment>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'customer-registration-page'
}

export default Page
