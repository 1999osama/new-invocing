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

const defaultValues: InvoiceForm = {
  balance: 0,
  issuedDate: new Date(),
  total: 0,
  title: ''
}

export const useInvoice = (serviceId: string | null) => {
  // ** Hook
  const { handleDrawer, handleModal } = useToggleDrawer()
  const store = useSelector((state: RootState) => state.invoices)
  const dispatch = useDispatch<AppDispatch>()

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
      const values = pick(store.entity, ['balance', 'issuedDate', 'total', 'title'])
      setFormValues<InvoiceKeys, InvoiceApi>(values as InvoiceApi, (key, value) => {
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
    dispatch(addAction({ data })).then(({ payload }: any) => {
      if (payload?.success) {
        form.reset()
        handleDrawer(null)
      } else {
        // console.log('============API_ERROR===============')
        // console.log(payload)
        // console.log('====================================')
      }
    })
  }

  const updateInvoice = async (id: string, data: InvoiceForm) => {
    dispatch(updateAction({ id, data })).then(({ payload }: any) => {
      if (payload?.success) {
        form.reset()
        handleDrawer(null)
      } else {
        // console.log('============API_ERROR===============')
        // console.log(payload)
        // console.log('====================================')
      }
    })
  }

  const deleteInvoice = async (id: string) => {
    dispatch(deleteAction({ id })).then(({ payload }: any) => {
      if (payload?.success) {
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
