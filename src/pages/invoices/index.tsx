// ** React Import
import { useEffect, Fragment } from 'react'

// ** Custom Components Import
import InvoicesTable from 'src/@core/components/apps/invoices/components/Table'
import TableHeader from 'src/@core/components/apps/invoices/components/TableHeader'
import DeleteAlert from 'src/@core/components/common/deleteAlert'

// ** Custom Hooks Import
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { useInvoice } from 'src/@core/hooks/apps/useInvoice'

// ** Types Import
import { ModalType } from 'src/types'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { InvoiceSlice } from 'src/store/apps/invoices'

const Page = () => {
  // **  Custom Hooks
  const { serviceId } = useToggleDrawer()

  const dispatch = useDispatch<AppDispatch>()

  const { push } = useRouter()

  const { getInvoices, deleteInvoice, exportInvoices } = useInvoice(serviceId)

  // ** Component Mount Phase API Calling
  useEffect(() => {
    getInvoices({ query: {} })
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
