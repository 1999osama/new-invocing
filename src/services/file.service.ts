import axios, { AxiosResponse } from 'axios'
import requests from './httpService'

const Services = {
  fileUpload(formData: any): Promise<AxiosResponse<any, any>> {
    return requests.post(`/upload`, formData)
  }
}

export default Services
