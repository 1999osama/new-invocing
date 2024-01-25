// ** React Imports
import { ReactNode, useEffect } from 'react'

// ** Next Import
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'

// ** Third Party Imports
import axios from 'axios'

// ** Types
import { InvoiceType } from 'src/types/apps/invoiceTypes'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Components Imports
// import PrintPage from 'src/views/apps/invoice/print/PrintPage'
import PreviewCard from 'src/@core/components/apps/invoices/components/PreviewCard'
import { useInvoice } from 'src/@core/hooks/apps/useInvoice'
import { IInvoice } from 'src/types/apps/invoices'
import { useRouter } from 'next/router'
import { Box, Grid } from '@mui/material'

const InvoicePrint = () => {
  const { getInvoice, store } = useInvoice(null)

  const {
    query: { id }
  } = useRouter()

  useEffect(() => {
    if (id) {
      getInvoice(id as string)
      setTimeout(() => {
        window.print()
      }, 100)
    }
  }, [id])

  return (
    <Box sx={{ p: 12, pb: 6 }}>
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

export async function getServerSideProps() {
  return {
    props: {}
  }
}

export default InvoicePrint
