import requests from 'src/services/httpService'
import { AxiosResponse } from 'axios'
import { ICustomerRegisterForm } from 'src/types/apps/customer-register'
import { GetParams } from 'src/types/api'

const Services = {
  getAll({ query }: GetParams): Promise<AxiosResponse> {
    return requests.get(`/vendor/get`, { params: query })
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`/vendor/get/${id}`)
  },
  add(body: ICustomerRegisterForm): Promise<AxiosResponse> {
    return requests.post('/vendor/create', body)
  },
  update(id: string, body: ICustomerRegisterForm): Promise<AxiosResponse> {
    return requests.put(`/vendor/edit/${id}`, body)
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`/vendor/delete/${id}`)
  }
  // search({ query }: GetParams): Promise<AxiosResponse> {
  //   return requests.get(`invoice?${query}`)
  // },
}

export default Services
