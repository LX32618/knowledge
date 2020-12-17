import { baseRequest } from '@/utils/request'

// export function login (data) {
//   return request({
//     url: `${rootUrl}login`,
//     method: 'post',
//     data
//   })
// }

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

// export function fetchMessages (option) {
//   return request({
//     url: `${rootUrl}messages`,
//     method: 'get',
//     params: {
//       id: option.id
//     }
//   })
// }
