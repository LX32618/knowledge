import request from '@/utils/request'
import { getToken } from '@/utils/auth'

const rootUrl = '/cas/'

export function login (data) {
  return request({
    url: `${rootUrl}login`,
    method: 'post',
    data
  })
}

export function getInfo () {
  return request({
    url: `${rootUrl}getToken`,
    method: 'get'
  })
}

export function logout () {
  return request({
    url: `${rootUrl}logout`,
    method: 'get'
  })
}

export function fetchMessages (option) {
  return request({
    url: `${rootUrl}messages`,
    method: 'get',
    params: {
      id: option.id
    }
  })
}
