import { UserDataType } from 'src/context/types'

export interface ICustomerRegister {
  name?: string
  title?: string
  vendor?: string
  email?: string
  merchantName?: string
  accountTitle?: string
  bankName?: string
  id?: string
  createdAt?: Date | null
}

export interface ICustomerRegisterApi extends IICustomerRegister {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface ICustomerRegisterForm extends IICustomerRegister {}

export type ICustomerRegisterKeys = keyof ICustomerRegisterForm
