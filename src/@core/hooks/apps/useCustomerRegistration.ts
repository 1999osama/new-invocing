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

const defaultValues: ICustomerRegisterForm = {
  name: '',
  email: '',
  vendor: '',
  address: '',
  BDForWireCode: '',
  BDForWireRouting: '',
  BDForACHRouting: '',
  BDForACHCode: '',
  merchantName: '',
  title: '',
  bankName: '',
  accountTitle: '',
  accountNumber: '',
  bankAddress: '',
  tax: 0
}

export const useCustomers = (serviceId: string | null) => {
  // ** Hook
  const { handleDrawer, handleModal } = useToggleDrawer()
  const store = useSelector((state: RootState) => state.customerRegister)
  const dispatch = useDispatch<AppDispatch>()

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
        'BDForWireCode',
        'BDForWireRouting',
        'BDForACHRouting',
        'BDForACHCode',
        'merchantName',
        'title',
        'bankName',
        'accountTitle',
        'accountNumber',
        'bankAddress',
        'tax'
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
        // form.reset()
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
