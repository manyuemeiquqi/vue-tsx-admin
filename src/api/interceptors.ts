import { Message } from '@arco-design/web-vue'
import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'

// InternalAxiosRequestConfig

// 请求封装
let token: string
axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
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
  (response: AxiosResponse) => {
    const { data: responseData } = response
    if (responseData.code !== 20000) {
      Message.error({
        content: responseData.msg || 'Error',
        duration: 5 * 1000
      })
      if (
        [50008, 50012, 50014].includes(responseData.code) &&
        response.config.url !== '/api/user/info'
      ) {
        // Modal.error({
        //   title: 'Confirm logout',
        //   content: 'You have been logged out, you can cancel to stay on this page, or log in again',
        //   okText: 'Re-Login',
        //   async onOk() {
        //     const userStore = useUserStore()
        //     await userStore.logout()
        //     window.location.reload()
        //   }
        // })
      }
      return Promise.reject(new Error(responseData.msg || 'Error'))
    }

    return responseData
  },
  (error) => {
    Message.error({
      content: error.msg || 'Request Error'
      //   duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
