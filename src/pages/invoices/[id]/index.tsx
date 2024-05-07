// ** React And Next Import
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

// ** Mui Import
import { Grid } from '@mui/material'

// ** Custom Components Import
import PreviewCard from 'src/@core/components/apps/invoices/components/PreviewCard'

// ** Custom Hooks Import
import { useInvoice } from 'src/@core/hooks/apps/useInvoice'

// ** Types Import
import { IInvoice } from 'src/types/apps/invoices'

const Page = () => {
  // Getting Id From The Params

  const {
    query: { id }
  } = useRouter()

  const { getInvoice, store } = useInvoice(null)

  // ** API Calling
  useEffect(() => {
    if (id) {
      getInvoice(id as string)
    }
  }, [id])

  return (
    <Grid container>
      {console.log(store.entity ,"store.entity")}
      <PreviewCard data={store.entity as IInvoice} />
    </Grid>
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
  subject: 'invoices-page'
}

export default Page
