import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { errorMsg } from '@/utils/msg'

const service = axios.create({
  withCredentials: true,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers.Authorization = getToken()
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    if (response.status === 200 && response.data.status === 0) {
      return response.data
    } else {
      errorMsg(response.data.msg)
      return Promise.reject(response.data.msg || 'error')
    }
  },
  error => {
    console.log(error)
    errorMsg(error.message)
    return Promise.reject(error)
  }
)

export default service
