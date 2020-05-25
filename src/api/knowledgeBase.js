import request from '@/utils/request'

const rootUrl = '/api1/system/knowledge/'

export function fetchKnowledgeCount (option) {
  return request({
    url: `${rootUrl}count`,
    method: 'post',
    data: {
      auditStatus: '1',
      createId: option.createId,
      order: 'descs'
    }
  })
}

export function findKnowledges (option) {
  return request({
    url: `${rootUrl}find`,
    method: 'post',
    data: {
      page: option.page || 1,
      rows: option.rows || 10,
      condition: {
        sort: option.sort || 'CREATEDATE',
        order: option.order || 'desc',
        auditing: option.auditing || 1,
        creator: option.creator
      }
    }
  })
}
