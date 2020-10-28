import request from '@/utils/request'

const rootUrl = '/cas/'

export function login (data) {
  return request({
    url: `${rootUrl}login`,
    method: 'post',
    data
  })
}

export function getInfo (token) {
  return request({
    url: `${rootUrl}getToken`,
    // url: 'http://192.168.3.100:8088/cas/getToken',
    method: 'get',
    params: { token }
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
