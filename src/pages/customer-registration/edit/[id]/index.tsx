import { Typography } from '@mui/material'
import { pick } from 'lodash'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Form from 'src/@core/components/apps/register-customer/components/Form'
import { DrawerHeader } from 'src/@core/components/common/DrawerHeader'
import { setFormValues } from 'src/@core/helper/setFormValues'
import { useCustomers } from 'src/@core/hooks/apps/useCustomerRegistration'
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { AppDispatch, RootState } from 'src/store'
import { fetchOneAction } from 'src/store/apps/customer-register'
import { ICustomerRegisterApi, ICustomerRegisterKeys } from 'src/types/apps/customer-register'

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
