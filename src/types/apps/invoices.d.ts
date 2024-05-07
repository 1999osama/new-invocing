import { UserDataType } from 'src/context/types'

export interface IInvoice {
  invoiceNo?: number
  balance: number
  subTotal: number | string
  creditCardTax: number | string
  grandTotal: number | string
  issuedDate: Date | null
  total: number
  user?: UserDataType
  vendor?: {
    email?: string
    name?: string
    merchantName1?: string
    bankName?: string
    contactNumber?: string
    accountTitle?: string
    accountNumber?: string
  }
  charges?: [
    {
      amount?: string | number
      description?: string
      id?: string | number
      price?: string
      total?: string
    }
  ]
  // order: number
  title?: string
  // status: string
  id?: string
  // image: string
  createdAt?: Date | null
}

export interface InvoiceApi extends IInvoice {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface InvoiceForm extends IInvoice {}

export type InvoiceKeys = keyof InvoiceForm
