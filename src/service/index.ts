import { BASE_URL, TIME_OUT } from './request/config'
import RhRequest from './request/index'
import { useLoginStore } from '@/store'
import { ElMessage } from 'element-plus'
import LocalCache from '@/utils/cache'

const requestInstance = new RhRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = LocalCache.getData('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (error) => {
      // console.log('request实例请求拦截器失败', error)
      return error
    },
    responseInterceptor: (config: any) => {
      if (config.code !== 0) {
        ElMessage.warning(config.data)
      }
      return config
    },
    responseInterceptorCatch: (error) => {
      if (error.response.status === 401) {
        const userStore = useLoginStore()
        userStore.resetState()
        ElMessage.warning('请重新登录！')
      }
      return Promise.reject(error)
    }
  }
})

export default requestInstance
