import requests from 'src/services/httpService'
import { AxiosResponse } from 'axios'
import { InvoiceForm } from 'src/types/apps/invoices'
import { GetParams } from 'src/types/api'

const Services = {
  getAll({ query }: GetParams): Promise<AxiosResponse> {
    return requests.get(`/category`, { params: query })
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`/category/${id}`)
  },
  add(body: InvoiceForm): Promise<AxiosResponse> {
    return requests.post('/category', body)
  },
  update(id: string, body: InvoiceForm): Promise<AxiosResponse> {
    return requests.put(`category/${id}`, body)
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`category/${id}`)
  }
  // search({ query }: GetParams): Promise<AxiosResponse> {
  //   return requests.get(`category?${query}`)
  // },
}

export default Services
