import request from '@/utils/request'
import { baseRequest } from '@/utils/request'


export function getInfo () {
  return baseRequest({
    url: `/app-zuul/getToken`,
    method: 'get'
  })
}

export function logout () {
  return baseRequest({
    url: '/cas/logout',
    method: 'get'
  })
}

export function fetchUserByDeptUser (data) {
  return request({
    url: '/sys-user-info-by-name/get',
    method: 'post',
    data
  })
}

export function isIpValid (ip) {
  return request({
    url: '/isMatch/get',
    method: 'post',
    data: {
      ip
    }
  })
}

// export function fetchMessages (option) {
//   return request({
//     url: `${rootUrl}messages`,
//     method: 'get',
//     params: {
//       id: option.id
//     }
//   })
// }
