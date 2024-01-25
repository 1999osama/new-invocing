import { pick, map, partialRight } from 'lodash'
import toast from 'react-hot-toast'
import { csvExport } from 'src/@core/utils/csv-export'

export enum List {
  category = 'category',
  invoice = 'invoice',
  employees = 'employees',
  clients = 'clients',
  projects = 'projects'
}

const Data = new Map<string, any>([
  [
    'category',
    {
      filename: 'category',
      headers: ['name', 'title', 'order', 'status', 'created at'],
      pick: ['name', 'title', 'order', 'status', 'created_at']
    }
  ],
  [
    'invoice',
    {
      filename: 'invoice',
      headers: ['invoice No', 'Total', 'Issued Date', 'Balance'],
      pick: ['invoiceNo', 'total', 'issuedDate', 'balance']
    }
  ],
  [
    'employees',
    {
      filename: 'employees',
      headers: ['id', 'email', 'first name', 'last name', 'phone', 'gender', 'role'],
      pick: ['id', 'email', 'first_name', 'last_name', 'phone', 'gender', 'role_code']
    }
  ],
  [
    'clients',
    {
      filename: 'clients',
      headers: ['name', 'email', 'phone', 'telephone', 'website', 'country', 'state', 'city'],
      pick: ['client_name', 'client_email', 'client_phone', 'client_telephone', 'website', 'country', 'state', 'city']
    }
  ],
  [
    'projects',
    {
      filename: 'projects',
      headers: [],
      pick: []
    }
  ]
])

export const csvDownload = (moduleName: string, arrayJson: any) => {
  if (Data.has(moduleName)) {
    const module = Data.get(moduleName)
    const mapped = map(arrayJson, partialRight(pick, module.pick))

    csvExport({
      filename: module.filename,
      headers: module.headers,
      data: mapped
    })
  } else {
    toast.error('Invalid CSV export')
  }
}
