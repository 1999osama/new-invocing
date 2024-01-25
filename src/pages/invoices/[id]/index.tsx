import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import PreviewCard from 'src/@core/components/apps/invoices/components/PreviewCard'
import { useInvoice } from 'src/@core/hooks/apps/useInvoice'
import { IInvoice } from 'src/types/apps/invoices'

const Page = () => {
  const {
    query: { id }
  } = useRouter()

  const { getInvoice, store } = useInvoice(null)

  useEffect(() => {
    if (id) {
      getInvoice(id as string)
    }
  }, [id])

  return (
    <Grid container>
      <PreviewCard data={store.entity as IInvoice} />
    </Grid>
  )
}

export async function getServerSideProps() {
  return {
    props: {}
  }
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'invoices-page'
}

export default Page
