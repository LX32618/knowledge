import request from '@/utils/request'
import _ from 'lodash'

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
  const searchOption = option.searchOption
  const baseOption = ['code', 'name', 'keyword', 'labels', 'createDate']
  const data = {
    page: option.page || 1,
    rows: option.rows || 10,
    userId: option.userId,
    condition: {
      sort: option.sort || 'CREATEDATE',
      order: option.order || 'desc',
      auditing: option.auditing || '1',
      classification: option.id,
      code: searchOption.code,
      name: searchOption.name,
      keyword: searchOption.keyword,
      mainFormField: {
        ..._.omit(searchOption, baseOption)
      }
    }
  }
  data.condition.labels = (searchOption.labels && searchOption.labels.length > 0)
    ? searchOption.labels.join(',')
    : ''
  if (searchOption.createDate && searchOption.createDate.length === 2) {
    data.condition.createdateMin = searchOption.createDate[0]
    data.condition.createdateMax = searchOption.createDate[1]
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
