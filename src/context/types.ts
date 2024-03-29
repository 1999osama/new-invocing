import { IUser } from 'src/types/apps/user'

export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
}

export type ChannelParams = {
  id: number
}

export type RegisterParams = {
  firstName: string
  lastName: string
  email: string
  password: string
  // gender: string
  // terms: boolean
}

export type UserDataType = {
  id: string
  gender?: string
  role: { id: string; code: 'user' | 'admin' }
  email: string
  fullName: string
  firstName?: string
  lastName: string
  username: string
  password: string
  avatar?: string | null
  user?: any
  profile_picture: string | null
  profilePicture?: string | null
}

export type AuthValuesType = {
  loading: boolean
  setLoading: (value: boolean) => void
  logout: () => void
  isInitialized: boolean
  user: UserDataType | null
  setUser: (value: UserDataType | null) => void
  setIsInitialized: (value: boolean) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  register: (params: RegisterParams, query?: any, errorCallback?: ErrCallbackType) => void
  profileUpdate: (body: ProfileUpdateParams, errorCallback?: ErrCallbackType) => void
  changeCredentials: (body: ChangePasswordParams, errorCallback?: ErrCallbackType) => void
  forgotPassword: (body: IUser, errorCallback?: ErrCallbackType) => void
  resetPassword: (body: ResetPasswordParams, token: string, errorCallback?: ErrCallbackType) => void
  // Signup related
  activeStep: number
  steps: { title: string; subtitle: string }[]
  handleBack: () => void
  handleNext: () => void
  handleReset: () => void

  // API status
  status: 'idle' | 'pending' | 'success' | 'error'
}

export type SocketValuesType = {
  socket: any
  setSocket?: any
}

export interface ISignupFormValues {
  firstName: string
  lastName: string
  email: string
  password: string
  confirm_password?: string
  // gender: string;
  API_ERROR?: {}
}

export interface ICompanyFormValues {
  name: string
  email: string
  address: string
  API_ERROR?: {}
}

export interface ForgotPasswordParams {
  email: string
}

export type ResetPasswordParams = {
  password: string
}

export type ChangePasswordParams = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export type ProfileUpdateParams = {
  firstName?: string
  lastName?: string
}
