export interface IInvoice {
  name: string
  description: string
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
