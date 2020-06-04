import request from '@/utils/request'

const rootUrl = '/api4/app/authcenter/api/'

export function fetchCategoryTree (option) {
  return request({
    url: `${rootUrl}categoryTree/get`,
    method: 'post',
    data: {
      id: option.id
    }
  })
}

export function fetchCategoryTreeAndNum (option) {
  return request({
    url: `${rootUrl}categoryTreeAndNum/get`,
    method: 'post',
    data: {
      id: option.id
    }
  })
}
