import { useEffect, Fragment } from 'react'
import InvoicesTable from 'src/@core/components/apps/invoices/components/Table'
import TableHeader from 'src/@core/components/apps/invoices/components/TableHeader'
import InvoicesDrawer from 'src/@core/components/apps/invoices/components/Drawer'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import DeleteAlert from 'src/@core/components/common/deleteAlert'
import { ModalType } from 'src/types'
import { useInvoice } from 'src/@core/hooks/apps/useInvoice'

const Page = () => {
  const { serviceId, isDrawerOpen, handleDrawer } = useToggleDrawer()

  const { getInvoices, deleteInvoice, exportInvoices, store } = useInvoice(serviceId)

  useEffect(() => {
    getInvoices({ query: {} })
  }, [])

  const handleDelete = () => {
    serviceId && deleteInvoice(serviceId)
  }

  return (
    <Fragment>
      <TableHeader
        value={''}
        handleFilter={() => { }}
        toggle={() => handleDrawer(null)}
        exportTable={() => exportInvoices()}
      />
      <InvoicesTable />
      <InvoicesDrawer open={isDrawerOpen} serviceId={serviceId} toggle={() => handleDrawer(null)} />
      <DeleteAlert title='invoice' type={ModalType.DEFAULT} onAgree={() => handleDelete()} />
    </Fragment>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'invoices-page'
}

export default Page
