import useAuth from '@/hooks/auth'
import { ResCode } from '@/types/constants'
import { getToken } from '@/utils/token'
import { Message, Modal } from '@arco-design/web-vue'
import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'

// InternalAxiosRequestConfig
export interface HttpResponse<T = unknown> extends AxiosResponse {
  status: number
  msg: string
  code: number
  data: T
}
if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
}

axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const { data: responseData } = response

    if (responseData.code !== ResCode.success) {
      Message.error({
        content: responseData.msg || 'Error',
        duration: 5 * 1000
      })
      if (
        [ResCode.illegalToken, ResCode.expiredToken, ResCode.otherLogin].includes(
          responseData.code
        ) &&
        response.config.url !== '/api/user/info'
      ) {
        Modal.error({
          title: 'Confirm logout',
          content: 'You have been logged out, you can cancel to stay on this page, or log in again',
          okText: 'Re-Login',
          async onOk() {
            const { logoutApp } = useAuth()
            await logoutApp()
            window.location.reload()
          }
        })
      }
      return Promise.reject(new Error(responseData.msg || 'Error'))
    }

    return responseData
  },
  (error) => {
    Message.error({
      content: error.msg || 'Request Error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
