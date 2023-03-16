import axios from 'axios'
import { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { RhRequestConfig, RhRequestInterceptors } from './type'

class RhRequest {
  instance: AxiosInstance
  interceptors?: RhRequestInterceptors

  constructor(config: RhRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    this.instance.interceptors.request.use(
      (config) => {
        console.log('axios请求拦截器成功', config)
        return config
      },
      (error) => {
        console.log('axios请求拦截器失败', error)
        return error
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('axios响应拦截器成功', res)
        const data = res.data
        return data
      },
      (error) => {
        console.log('axios响应拦截器失败', error)
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
  }
  request<T = any>(config: RhRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      console.log('request:config', config)
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(
          config as InternalAxiosRequestConfig
        )
      }
      console.log('request:config', config)
      this.instance
        .request<any, T>(config)
        .then((res: T) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  get<T = any>(config: RhRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }
}

export default RhRequest
