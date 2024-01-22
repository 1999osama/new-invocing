import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

const instance = axios.create({
  // baseURL: 'http://localhost:5000/api/v1', // My local Node Js Project
  baseURL: 'https://3f64-202-63-208-114.ngrok-free.app/api/v1', // My Ngrok Of Node Js Project
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
      authorization: storedToken ? `Bearer ${storedToken}` : null,
      'ngrok-skip-browser-warning': true
    }
  }
})

export default instance
