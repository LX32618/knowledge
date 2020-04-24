import request from '@/utils/request'

const rootUrl = '/knowledge/'

export function fetchKnowledges (option) {
  return request({
    url: `${rootUrl}find`,
    method: 'get',
    params: {
      page: 1,
      rows: 10,
      sort: 0,
      order: 0,
      auditing: 0,
      creator: option.creator,
      type: option.type
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

export function fetchCollectKnowledgeCount (option) {
  return request({
    url: '/collectKnowledge/count',
    method: 'get',
    params: {
      auditing: 0,
      creator: option.creator,
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
