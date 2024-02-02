// ** React & Next Imports
import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'

// ** Mui Import
import { Box } from '@mui/material'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Custom Component Import
import PreviewCard from 'src/@core/components/apps/invoices/components/PreviewCard'

// ** Custom Hooks Import
import { useInvoice } from 'src/@core/hooks/apps/useInvoice'

// ** Types Import
import { IInvoice } from 'src/types/apps/invoices'

const InvoicePrint = () => {
  // **  Hooks
  const { getInvoice, store } = useInvoice(null)

  const {
    query: { id }
  } = useRouter()

  // ** Api Calling
  useEffect(() => {
    if (id) {
      getInvoice(id as string)
    }
  }, [id])

  return (
    <Box sx={{ p: 5 }}>
      <PreviewCard data={store?.entity as IInvoice} />
    </Box>
  )
}

InvoicePrint.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

InvoicePrint.setConfig = () => {
  return {
    mode: 'light'
  }
}

// ** Server Side Rendering Page For The Specific Id
export async function getServerSideProps() {
  return {
    props: {}
  }
}

// ACL Implementation For Every Page
InvoicePrint.acl = {
  action: 'itsHaveAccess',
  subject: 'invoices-page'
}

export default InvoicePrint
