import { BASE_URL, TIME_OUT } from './request/config'
import RhRequest from './request/index'
import { useRouter } from 'vue-router'
import LocalCache from '@/utils/cache'
import { ElMessage } from 'element-plus'

console.log(BASE_URL, TIME_OUT)
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
    responseInterceptor: (config) => {
      // console.log('request实例响应拦截器成功', config)
      return config
    },
    responseInterceptorCatch: (error) => {
      console.log('request实例响应拦截器失败', error)
      if (error.response.status === 401) {
        // LocalCache.clearCache()
        const router = useRouter()
        router.replace('/login')
        ElMessage.warning('请重新登录！')
      }
      return Promise.reject(error)
    }
  }
})

export default requestInstance
