import { AxiosResponse } from 'axios'
import { IUser } from 'src/types/apps/user'
import requests from './httpService'
import { ForgotPasswordParams, ResetPasswordParams, ChangePasswordParams, ProfileUpdateParams } from 'src/context/types'

const AuthServices = {
  login(body: any): Promise<AxiosResponse<any, any>> {
    return requests.post(`user/login`, body)
  },
  signup(body: any, query?: any): Promise<AxiosResponse<any, any>> {
    return requests.post(`/auth/register`, body)
  },
  profileUpdate(body: ProfileUpdateParams): Promise<AxiosResponse<any, any>> {
    return requests.put(`/user/profile`, body)
  },
  changePassword(body: ChangePasswordParams): Promise<AxiosResponse<any, any>> {
    return requests.put(`/user/password`, body)
  },
  me(): Promise<AxiosResponse<any, any>> {
    return requests.get(`/auth/me`)
  },
  forgotPassword(body: ForgotPasswordParams): Promise<AxiosResponse<any, any>> {
    return requests.post(`/auth/forgot-password`, body)
  },
  resetPassword(body: ResetPasswordParams, token: string): Promise<AxiosResponse<any, any>> {
    return requests.post(`/auth/reset-password?token=${token}`, body)
  },
  channelSwitch(id: number): Promise<AxiosResponse<any, any>> {
    return requests.get(`/auth/switch/${id}`)
  }
}

export default AuthServices
