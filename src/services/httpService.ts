import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

const instance = axios.create({
  // baseURL: 'http://localhost:5000/api/v1', // My local Node Js Project
  baseURL: 'https://a7d3-202-63-208-114.ngrok-free.app/api/v1', // Usama Ngrok Of Node Js Project
  // baseURL: 'https://c5ec-103-138-51-142.ngrok-free.app/api/v1', // Usama Ngrok Of Node Js Project
  // baseURL: 'https://teaminer.academy/api/v1', // live
  timeout: 500000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// Add a request interceptor
instance.interceptors.request.use(function (config: any) {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!

  return {
    ...config,
    headers: {
      authorization: storedToken ? `${storedToken}` : null,
      // Add This For NGROK
      'ngrok-skip-browser-warning': true
    }
  }
})

export default instance
