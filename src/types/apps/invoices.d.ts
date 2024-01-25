import { UserDataType } from 'src/context/types'

export interface IInvoice {
  invoiceNo?: number
  balance: number
  issuedDate: Date | null
  total: number
  user?: UserDataType
  // order: number
  // title: string
  // status: string
  id?: string
  // image: string
  // createdAt: Date | null
}

export interface InvoiceApi extends IInvoice {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface InvoiceForm extends IInvoice {}

export type InvoiceKeys = keyof InvoiceForm
