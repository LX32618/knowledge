import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { errorMsg } from '@/utils/msg'

export const baseRequest = axios.create({
  timeout: 30000
})

export const treeRequest = axios.create({
  baseURL: '/app-zuul/treeManage/tree/authcenter/api',
  timeout: 30000
})

const knowledgeRequest = axios.create({
  baseURL: '/app-zuul/knowledge/app/authcenter/api',
  timeout: 30000
})

const requestInterceptor = config => {
  if (store.getters.token) {
    config.headers.Authorization = getToken()
  }
  const userInfo = store.getters.userInfo

  if (userInfo && config.data && !config.data.userId) {
    config.data.userId = userInfo.id
  }
  return config
}

const responseInterceptor = response => {
  if (response.data.constructor === String && response.data.indexOf('登录') !== -1 && response.data.indexOf('<html>') !== -1) {
    window.location.replace('/app-zuul/login')
  } else if (response.status === 200 && response.data.status === 'success') {
    return response.data
  } else if (response.headers["content-type"] === 'application/x-msdownload;charset=UTF-8') {
    return response.data
  }
  else {
    console.log(1234)
    response.data.message && errorMsg(response.data.message)
    return Promise.reject(response.data.message || 'error')
  }
}

const errorInterceptor = error => {
  errorMsg(error.message)
  return Promise.reject(error)
}

const baseResponseInterceptor = response => {
  if (response.data.constructor === String && response.data.indexOf('登录') !== -1 && response.data.indexOf('<html>') !== -1) {
    window.location.replace('/app-zuul/login')
  } else if (response.status === 200) {
    return response.data
  } else {
    errorMsg(response.data.message)
    return Promise.reject(response.data.message || 'error')
  }
}

baseRequest.interceptors.request.use(requestInterceptor, errorInterceptor)
baseRequest.interceptors.response.use(baseResponseInterceptor, errorInterceptor)

treeRequest.interceptors.request.use(requestInterceptor, errorInterceptor)
treeRequest.interceptors.response.use(responseInterceptor, errorInterceptor)

knowledgeRequest.interceptors.request.use(requestInterceptor, errorInterceptor)
knowledgeRequest.interceptors.response.use(responseInterceptor, errorInterceptor)


export default knowledgeRequest
