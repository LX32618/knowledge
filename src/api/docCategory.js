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
      id: option.id,
      userId: option.userId
    }
  })
}

// 根据目录id数组获取knowledgebase
export function getKnowledgeByClassifications (option={}) {
  const data = {
    page: option.page || 1,
    rows: option.rows || 10,
    userId: option.userId,
    condition: {
      sort: option.sort || 'CREATEDATE',
      order: option.order || 'desc',
      auditing: option.auditing || '1',
      classification: option.id,
      name: option.name,
      keyword: option.keyword    }
  }
  data.condition.labels = (option.labels && option.labels.length > 0)
    ? option.labels.join(',')
    : ''
  if (option.createDate && option.createDate.length === 2) {
    data.condition.createdateMin = option.createDate[0]
    data.condition.createdateMax = option.createDate[1]
  }
  return request({
    url: `${rootUrl}categoryKnowledgeItemsByNodeId/get`,
    method: 'post',
    data
  })
}

// 根据目录ID获取对应的标签数据
export function getLabelesTree (option) {
  return request({
    url: `${rootUrl}labels/get`,
    method: 'post',
    data: {
      id: option.id
    }
  })
}
