import request from '@/utils/request'

const rootUrl = '/api2/'

export function fetchDictTree (option) {
  return request({
    url: `${rootUrl}dicTree/get`,
    method: 'post',
    data: {
      id: option.id
    }
  })
}
