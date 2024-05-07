import { useEffect, useMemo } from 'react'

// ** Third Party Imports
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { pick } from 'lodash'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'

// ** import custom hooks
import { RootState, AppDispatch } from 'src/store'

// Schema
import { customerRegistrationSchema } from 'src/@core/schema'

// ** types
import { GetParams } from 'src/services/service'
import { ICustomerRegisterForm, ICustomerRegisterKeys, ICustomerRegisterApi } from 'src/types/apps/customer-register'

// ** import API services
import { csvDownload } from 'src/@core/helper/csv-export'

// ** Actions Imports
import { fetchAllAction, fetchOneAction, addAction, updateAction, deleteAction } from 'src/store/apps/customer-register'
import { setFormValues } from 'src/@core/helper/setFormValues'

import { useRouter } from 'next/router'

const defaultValues: ICustomerRegisterForm = {
  name: '',
  email: '',
  vendor: '',
  address: '',
  contactNumber: '',
  tax: 0,
  wireCode: '026009593',
  routingNumber: '122400724',
  swiftCode: 'BOFAUS3N',
  title: 'TECHMATTER LLC',
  merchantName1: 'RCM Matter',
  merchantName2: 'TECHMATTER',
  bankName: 'Bank of America',
  accountTitle: 'TECHMATTER LLC',
  accountNumber: '5010‐2437‐9261',
  bankAddress: '433 Walnut Ct , Pittsburgh, PA 15237, USA'
}

export const useCustomers = (serviceId: string | null) => {
  // ** Hook
  const { handleDrawer, handleModal } = useToggleDrawer()
  const store = useSelector((state: RootState) => state.customerRegister)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const form = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(customerRegistrationSchema.add)
  })

  useEffect(() => {
    serviceId && dispatch(fetchOneAction({ id: serviceId }))
  }, [serviceId])

  useMemo(() => {
    if (serviceId && store?.entity && 'id' in store.entity) {
      const values = pick(store.entity, [
        'name',
        'email',
        'vendor',
        'address',
        'wireCode',
        'routingNumber',
        'swiftCode',
        'title',
        'merchantName1',
        'merchantName2',
        'bankName',
        'accountTitle',
        'accountNumber',
        'bankAddress',
        'tax',
        'contactNumber'
      ])
      setFormValues<ICustomerRegisterKeys, ICustomerRegisterApi>(values as ICustomerRegisterApi, (key, value) => {
        // @ts-ignore
        form.setValue(key, value)
      })
    } else {
      form.reset()
    }
  }, [store.entity, serviceId])

  const getCustomer = async (id: string) => {
    dispatch(fetchOneAction({ id }))
  }

  const getCustomers = async ({ query }: GetParams) => {
    dispatch(fetchAllAction({ query }))
  }

  const addCustomer = async (data: ICustomerRegisterForm) => {
    dispatch(addAction({ data })).then(({ payload }: any) => {
      if (payload?.data) {
        form.reset()
        router.push('/customer-registration')
      } else {
        // console.log('============API_ERROR===============')
        // console.log(payload)
        // console.log('====================================')
      }
    })
  }

  const updateCustomer = async (id: string, data: ICustomerRegisterForm) => {
    dispatch(updateAction({ id, data })).then(({ payload }: any) => {
      if (payload?.data) {
        form.reset()
        router.push('/customer-registration')
      } else {
        // console.log('============API_ERROR===============')
        // console.log(payload)
        // console.log('====================================')
      }
    })
  }

  const deleteCustomer = async (id: string) => {
    dispatch(deleteAction({ id })).then(({ payload }: any) => {
      if (payload?.data) {
        handleModal(null)
      } else {
        // console.log('============API_ERROR===============')
        // console.log(payload)
        // console.log('====================================')
      }
    })
  }

  const exportCustomers = async () => {
    csvDownload('customers', store.entities)
  }

  return {
    form,
    store,
    getCustomer,
    getCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    exportCustomers
  }
}
