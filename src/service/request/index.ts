import axios from 'axios'
import { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { RhRequestConfig, RhRequestInterceptors } from './type'
import { ElLoading, ElMessage } from 'element-plus'
class RhRequest {
  instance: AxiosInstance
  interceptors?: RhRequestInterceptors
  isLoading: any
  constructor(config: RhRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.instance.interceptors.request.use(
      (config) => {
        this.isLoading = ElLoading.service({
          lock: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        return config
      },
      (error) => {
        return error
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        const data = res.data
        this.isLoading?.close()
        return data
      },
      (error) => {
        if (error.response?.data) {
          ElMessage.error(error.response.data)
        }
        this.isLoading?.close()
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
  post<T = any>(config: RhRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }
}

export default RhRequest
