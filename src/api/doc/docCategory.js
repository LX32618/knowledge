import request from '@/utils/request'

const rootUrl = '/doc/docCategory/'

export function findAllKnowlibrary () {
  return request({
    url: `${rootUrl}findAllKnowlibrary`,
    method: 'get'
  })
}
