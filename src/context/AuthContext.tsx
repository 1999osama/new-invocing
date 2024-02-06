// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Config
import authConfig from 'src/configs/auth'

import { AuthServices } from 'src/services'

// ** Types
import {
  AuthValuesType,
  RegisterParams,
  LoginParams,
  ErrCallbackType,
  UserDataType,
  ISignupFormValues,
  ICompanyFormValues,
  ChannelParams,
  ForgotPasswordParams,
  ResetPasswordParams,
  ChangePasswordParams,
  ProfileUpdateParams
} from './types'

// ** Third Party Imports
import toast from 'react-hot-toast'
// import { IUser } from 'src/types/apps/user'

const steps = [
  {
    title: 'Create Account',
    subtitle: 'Add Persnol Details'
  },
  {
    title: 'Create Company',
    subtitle: 'Add Company Details'
  },
  {
    title: 'Subscriptions',
    subtitle: 'Pick a plan that works best for you'
  }
]

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setIsInitialized: () => Boolean,
  register: () => Promise.resolve(),
  profileUpdate: () => Promise.resolve(),
  changeCredentials: () => Promise.resolve(),
  // Signup related
  activeStep: 0,
  steps,
  handleBack: () => Promise.resolve(),
  handleNext: () => Promise.resolve(),
  handleReset: () => Promise.resolve(),

  // API status
  status: 'idle',
  // @ts-ignore
  setStatus: () => ''
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const [status, setStatus] = useState<AuthValuesType['status']>('idle')
  const [isInitialized, setIsInitialized] = useState<boolean>(defaultProvider.isInitialized)
  const [activeStep, setActiveStep] = useState<number>(defaultProvider.activeStep) // signup step form

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      setLoading(true)

      setIsInitialized(true)

      const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      // const refreshToken = window.localStorage.getItem(authConfig.refreshTokenKeyName)
      const user = JSON.parse(window.localStorage.getItem('userData') || '{}')

      if (accessToken && user) {
        saveLogin({ accessToken, user })
      }
      setLoading(false)
    }
    initAuth()
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    setStatus('pending')
    AuthServices.login(params)
      .then(async ({ data: response }) => {
        saveLogin({
          accessToken: response.data.user.token.accessToken || '',
          // refreshToken: response.data.tokens.refreshToken || '',
          user: response.data.user
        })
        toast.success('Login Success')
        // if (response.data.user.role.code === 'admin') {
        //   router.push('/customer-registration')
        // } else {
        //   router.push('/settings/profile')
        // }
        setStatus('success')
      })
      .catch(error => {
        setStatus('error')
        if (errorCallback) errorCallback(error.response?.data || error)
      })
  }

  const handleLogout = () => {
    setUser(null)
    setIsInitialized(false)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    window.localStorage.removeItem(authConfig.refreshTokenKeyName)
    router.push('/login')
  }

  const handleRegister = (params: RegisterParams, errorCallback?: ErrCallbackType) => {
    setStatus('pending')
    AuthServices.signup(params)
      .then(async ({ data: response }) => {
        saveLogin({
          accessToken: response.data.user.token.accessToken || '',
          refreshToken: response.data.user.token.refreshToken || '',
          user: response.data.user
        })
        router.push('/invoices')
        setStatus('success')
      })
      .catch(error => {
        setStatus('error')
        if (errorCallback) errorCallback(error.response?.data)
      })
  }

  const changePassword = async (body: ChangePasswordParams, errorCallback?: ErrCallbackType) => {
    setStatus('pending')
    try {
      const { data } = await AuthServices.changePassword(body)
      if (data?.message === 'Password changed successfully') {
        toast.success(data?.message)
        setStatus('success')
      }
    } catch (error: any) {
      setStatus('error')
      toast.error(error?.response?.data?.message || 'Something went wrong!')
      if (errorCallback) errorCallback(error?.response?.data)
    }
  }

  const handleProfileUpdate = (body: ProfileUpdateParams, errorCallback?: ErrCallbackType) => {
    setStatus('pending')
    AuthServices.profileUpdate(body)
      .then(async ({ data: response }) => {
        saveLogin({
          accessToken: localStorage.getItem('accessToken') || '',
          refreshToken: localStorage.getItem('accessToken') || '',
          user: {
            ...response?.user,
            token: { accessToken: localStorage.getItem('accessToken') }
          }
        })
        toast.success(response?.message)
        setUser({
          ...response?.user,
          token: { accessToken: JSON.parse(JSON.stringify(localStorage.getItem('accessToken'))) }
        })
        setStatus('success')
      })
      .catch(error => {
        setStatus('error')
        if (errorCallback) errorCallback(error.response?.data)
      })
  }

  // ** Forget password
  const handleForgotPassword = (params: ForgotPasswordParams, errorCallback?: ErrCallbackType) => {
    setStatus('pending')
    AuthServices.forgotPassword(params)
      .then(async ({ data: response }) => {
        toast.success('Email send success, Check your email')
        setStatus('success')
        router.push('/login')
      })
      .catch(error => {
        toast.error(error?.response?.data?.message || `Something went wrong`)
        setStatus('error')
        if (errorCallback) errorCallback(error.response?.data)
      })
  }

  // ** Forget password
  const handleResetPassword = (params: ResetPasswordParams, token: string, errorCallback?: ErrCallbackType) => {
    setStatus('pending')
    AuthServices.resetPassword(params, token)
      .then(async ({ data: response }) => {
        toast.success('Password reset success, Try login Now')
        setStatus('success')
        router.push('/login')
      })
      .catch(error => {
        toast.error(`Something went wrong`)
        setStatus('error')
        if (errorCallback) errorCallback(error.response?.data)
      })
  }

  // Handle Stepper Back
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  // Handle Stepper Next
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
    if (activeStep === steps.length - 1) {
      toast.success('Form Submitted')
    }
  }

  // Handle Stepper Reset all process
  const handleReset = () => {
    setActiveStep(0)
  }

  const saveLogin = ({
    accessToken,
    refreshToken,
    user
  }: {
    accessToken: string
    refreshToken?: string
    user: any
  }) => {
    // save token in localStorage
    window.localStorage.setItem(authConfig.storageTokenKeyName, accessToken)
    // window.localStorage.setItem(authConfig.refreshTokenKeyName, refreshToken)

    const returnUrl = router.query.returnUrl

    // console.log('=========returnUrl===========================')
    // console.log(returnUrl)
    // console.log('====================================')

    setUser(user)
    window.localStorage.setItem('userData', JSON.stringify(user))

    const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : router.asPath

    // router.replace(redirectURL as string)
    router.replace(redirectURL as string)
  }

  const values = {
    user,
    loading,
    activeStep,
    steps,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    login: handleLogin,
    profileUpdate: handleProfileUpdate,
    logout: handleLogout,
    register: handleRegister,
    changeCredentials: changePassword,
    forgotPassword: handleForgotPassword,
    resetPassword: handleResetPassword,
    handleBack,
    handleNext,
    handleReset,
    status,
    setStatus
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
