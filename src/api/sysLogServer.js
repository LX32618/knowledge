import request from '@/utils/request'

export function getFootprints () {
  return request({
    url: 'getFootprints',
    method: 'post',
    data: {}
  })
}
