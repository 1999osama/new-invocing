import requests from 'src/services/httpService'
import { AxiosResponse } from 'axios'
import { InvoiceForm } from 'src/types/apps/invoices'
import { GetParams } from 'src/types/api'

const Services = {
  getAll({ query }: GetParams): Promise<AxiosResponse> {
    return requests.get(`/invoice`, { params: query })
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`/invoice/${id}`)
  },
  add(body: InvoiceForm): Promise<AxiosResponse> {
    return requests.post('/invoice', body)
  },
  update(id: string, body: InvoiceForm): Promise<AxiosResponse> {
    return requests.put(`invoice/${id}`, body)
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`invoice/${id}`)
  }
  // search({ query }: GetParams): Promise<AxiosResponse> {
  //   return requests.get(`invoice?${query}`)
  // },
}

export default Services
