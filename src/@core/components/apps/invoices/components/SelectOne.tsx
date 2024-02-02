import React, { useState, useMemo, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

// ** MUI
import Radio from '@mui/material/Radio'
import Autocomplete from '@mui/material/Autocomplete'
import TextField, { BaseTextFieldProps } from '@mui/material/TextField'

// ** Actions
import { fetchAllAction } from 'src/store/apps/customer-register'

import { Controller } from 'react-hook-form'

// ** types
import { RootState, AppDispatch } from 'src/store'
import { ICustomerRegister, ICustomerRegisterApi } from 'src/types/apps/customer-register'
import { useRouter } from 'next/router'

interface CustomerSelect extends BaseTextFieldProps {
  execute?: boolean
  customer: ICustomerRegisterApi | {}
  setCustomer: (project: ICustomerRegisterApi) => void
  isInvoiceSubmitted?: any
  setIsInvoiceSubmitted?: any
  serviceId?: string | null | undefined
}

export default function CustomerSelect({
  execute = false,
  customer,
  setCustomer,
  isInvoiceSubmitted,
  setIsInvoiceSubmitted,
  serviceId,
  ...props
}: CustomerSelect) {
  const [selected, setSelected] = useState<ICustomerRegisterApi | {}>(customer)

  const store = useSelector((state: RootState) => state.customerRegister)
  const invoiceStore = useSelector((state: RootState) => state.invoices)
  const dispatch = useDispatch<AppDispatch>()
  const { push, pathname } = useRouter()

  useEffect(() => {
    if (!store?.entities?.length && pathname === '/invoices/edit/[id]') {
      push('/invoices')
    }
    execute && dispatch(fetchAllAction({ query: {} }))
    return () => {
      setSelected({})
    }
  }, [])

  useEffect(() => {
    if (serviceId && invoiceStore?.entity) {
      const selectedEntity: any = invoiceStore?.entities?.find(entity => entity?.id === serviceId)
      setSelected(selectedEntity?.vendor || {})
      if (selectedEntity?.vendor) {
        setCustomer({
          id: selectedEntity?.vendor?.id
        })
      }
    }
  }, [serviceId, invoiceStore?.entity])

  useEffect(() => {
    if (isInvoiceSubmitted) {
      setSelected({})
      setIsInvoiceSubmitted(false)
    }
  }, [isInvoiceSubmitted])

  useMemo(() => {
    selected && 'id' in selected && setCustomer(selected)
  }, [selected])

  return (
    <Autocomplete
      fullWidth
      id='customer-single-select'
      options={store.entities}
      autoHighlight
      getOptionLabel={(option: ICustomerRegister | {}) => {
        if (option && 'name' in option) return option.name as string
        else return ''
      }}
      value={selected}
      disableCloseOnSelect
      // @ts-ignore
      onChange={(event, value) => setSelected(value)}
      // @ts-ignore
      renderOption={(props, option: ICustomerRegister, { selected }) => (
        <li {...props}>
          <Radio checked={selected} />
          {option?.name}
        </li>
      )}
      renderInput={params => <TextField {...params} {...props} label='Select customer' placeholder='Customer' />}
    />
  )
}

interface CustomerSelectWithFormProps {
  control: any
  name: string
}

export const CustomerSelectWithForm: React.FC<CustomerSelectWithFormProps> = ({ control, name }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <CustomerSelect
          execute={false}
          error={Boolean(error)}
          customer={value}
          setCustomer={customer => onChange(customer.id)}
        />
      )}
    />
  )
}
