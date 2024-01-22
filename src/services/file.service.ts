import axios, { AxiosResponse } from 'axios'
import requests from './httpService'

const Services = {
  fileUpload(formData: any): Promise<AxiosResponse<any, any>> {
    return axios({
      url: `${requests.getUri()}/file`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: formData
    })
  }
}

export default Services
