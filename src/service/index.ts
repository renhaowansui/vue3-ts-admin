import { BASE_URL, TIME_OUT } from './request/config'
import RhRequest from './request/index'

console.log(BASE_URL, TIME_OUT)
const requestInstance = new RhRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      console.log('request实例请求拦截器成功', config)
      return config
    },
    requestInterceptorCatch: (error) => {
      console.log('request实例请求拦截器失败', error)
      return error
    },
    responseInterceptor: (config) => {
      console.log('request实例响应拦截器成功', config)
      return config
    },
    responseInterceptorCatch: (error) => {
      console.log('request实例响应拦截器失败', error)
      return Promise.reject(error)
    }
  }
})

export default requestInstance
