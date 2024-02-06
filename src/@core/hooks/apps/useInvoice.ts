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
import { invoicesSchema } from 'src/@core/schema'

// ** types
import { GetParams } from 'src/services/service'
import { InvoiceForm, InvoiceKeys, InvoiceApi } from 'src/types/apps/invoices'

// ** import API services
import { csvDownload } from 'src/@core/helper/csv-export'

// ** Actions Imports
import { fetchAllAction, fetchOneAction, addAction, updateAction, deleteAction } from 'src/store/apps/invoices'
import { setFormValues } from 'src/@core/helper/setFormValues'
import { useRouter } from 'next/router'

const defaultValues = {
  vendor: '',
  charges: [
    {
      description: '',
      amount: 0,
      price: 0,
      total: 0
    }
  ],
  subTotal: 0,
  creditCardTax: 0,
  grandTotal: 0
}

export const useInvoice = (serviceId: string | null) => {
  // ** Hook
  const { handleDrawer, handleModal } = useToggleDrawer()
  const store = useSelector((state: RootState) => state.invoices)
  const dispatch = useDispatch<AppDispatch>()
  const { push } = useRouter()

  const form = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(invoicesSchema.add)
  })

  useEffect(() => {
    serviceId && dispatch(fetchOneAction({ id: serviceId }))
  }, [serviceId])

  useMemo(() => {
    if (serviceId && store?.entity && 'id' in store.entity) {
      const values = pick(store.entity, ['charges', 'subtotal', 'creditCardTax', 'grandTotal'])
      setFormValues<InvoiceKeys, InvoiceApi>(values as InvoiceApi, (key: any, value) => {
        form.setValue(key, value)
      })
    } else {
      form.reset()
    }
  }, [store.entity, serviceId])

  const getInvoice = async (id: string) => {
    dispatch(fetchOneAction({ id }))
  }

  const getInvoices = async ({ query }: GetParams) => {
    dispatch(fetchAllAction({ query }))
  }

  const addInvoice = async (data: InvoiceForm) => {
    const { payload } = await dispatch(addAction({ data }))
    if (payload.data) {
      form.reset()
      return payload
    }
  }

  const updateInvoice = async (id: string, data: InvoiceForm) => {
    dispatch(updateAction({ id, data })).then(({ payload }: any) => {
      if (payload?.success) {
        form.reset()
        push('/invoices')
        // handleDrawer(null)
      } else {
        // console.log('============API_ERROR===============')
        // console.log(payload)
        // console.log('====================================')
      }
    })
  }

  const deleteInvoice = async (id: string) => {
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

  const exportInvoices = async () => {
    csvDownload('invoice', store.entities)
  }

  return {
    form,
    store,
    getInvoice,
    getInvoices,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    exportInvoices
  }
}
