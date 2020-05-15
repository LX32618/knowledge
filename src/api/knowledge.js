import request from '@/utils/request'

const rootUrl = '/knowledge/'

export function fetchKnowledges (option) {
  return request({
    url: `${rootUrl}find`,
    method: 'get',
    params: {
      page: option.page || 1,
      rows: option.rows || 10,
      sort: 0,
      order: 0,
      auditing: 0,
      creator: option.creator,
      type: option.type,
      id: option.id,
    }
  })
}

export function fetchKnowledgeCount (option) {
  return request({
    url: `${rootUrl}count`,
    method: 'get',
    params: {
      auditing: 0,
      creator: option.creator,
    }
  })
}
// 获取收藏知识总条数
export function fetchCollectKnowledgeCount (option) {
  return request({
    url: '/api1/knowledgeCollect/count',
    method: 'get',
    params: {
      userId: option.userId,
    }
  })
}

export function getCategoryTree (option) {
  return request({
    url: `${rootUrl}getCategoryTree`,
    method: 'get',
    params: {
      id: option.id
    }
  })
}

export function getLablesTree (option) {
  return request({
    url: `${rootUrl}getLablesTree`,
    method: 'get',
    params: {
      classificationid: option.classificationid
    }
  })
}

export function validateKnowledgeName (name) {
  return request({
    url: `${rootUrl}validateKnowledgeName`,
    method: 'get',
    params: {
      name
    }
  })
}

export function fetchKnowledgeDetail (option) {
  return request({
    url: `${rootUrl}dataView`,
    method: 'get',
    params: {
      id: option.id
    }
  })
}

export function fetchPushList (option) {
  return request({
    url: `${rootUrl}pushList`,
    method: 'get',
    params: {
      id: option.id
    }
  })
}

// 字典接口，测试用
export function fetchDictTree (option) {
  return request({
    url: '/sysDic/dictTree',
    method: 'get',
    params: {
      id: option.id
    }
  })
}
