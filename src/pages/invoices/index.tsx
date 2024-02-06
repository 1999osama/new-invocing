// ** React/Next Import
import { useEffect, Fragment } from 'react'
import { useRouter } from 'next/router'

// ** Custom Components Import
import InvoicesTable from 'src/@core/components/apps/invoices/components/Table'
import TableHeader from 'src/@core/components/apps/invoices/components/TableHeader'
import DeleteAlert from 'src/@core/components/common/deleteAlert'

// ** Custom Hooks Import
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { useInvoice } from 'src/@core/hooks/apps/useInvoice'
import { useCustomers } from 'src/@core/hooks/apps/useCustomerRegistration'

// ** Types Import
import { ModalType } from 'src/types'

const Page = () => {
  // **  Custom Hooks
  const { serviceId } = useToggleDrawer()

  const { push } = useRouter()

  const { getInvoices, deleteInvoice, exportInvoices } = useInvoice(null)
  const { getCustomers, store } = useCustomers(null)

  // ** Component Mount Phase API Calling
  useEffect(() => {
    getInvoices({ query: {} })
    if (!store.entities.length) {
      getCustomers({ query: {} })
    }
    return () => {}
  }, [])

  // ** Functions
  const handleDelete = () => {
    serviceId && deleteInvoice(serviceId)
  }

  return (
    <Fragment>
      <TableHeader
        value={''}
        handleFilter={() => {}}
        toggle={() => push(`/invoices/add`)}
        exportTable={() => exportInvoices()}
      />
      <InvoicesTable />
      <DeleteAlert title='invoice' type={ModalType.DEFAULT} onAgree={() => handleDelete()} />
    </Fragment>
  )
}

// ACL Implementation For Every Page
Page.acl = {
  action: 'itsHaveAccess',
  subject: 'invoices-page'
}

export default Page
