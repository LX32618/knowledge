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

// 根据目录id数组获取knowledgebase
export function getKnowledgeByClassifications (option={}) {
  const data = {
    page: option.page || 1,
    rows: option.rows || 10,
    condition: {
      sort: option.sort || 'CREATEDATE',
      order: option.order || 'desc',
      auditing: option.auditing || '1',
      classification: option.id,
      name: option.name,
      keyword: option.keyword,
      labels: option.labels
    }
  }
  if (option.createDate && option.createDate.length === 2) {
    data.condition.createdateMin = option.createDate[0]
    data.condition.createdateMax = option.createDate[1]
  }
  console.log(data)
  return request({
    url: `${rootUrl}categoryKnowledgeItemsByNodeId/get`,
    method: 'post',
    data
  })
}
