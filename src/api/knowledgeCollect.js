import request from '@/utils/request'

const rootUrl = '/api1/knowledgeCollect/'

// 获取收藏知识总条数
export function fetchCollectKnowledgeCount (option) {
  return request({
    url: `${rootUrl}count`,
    method: 'post',
    data: {
      userId: option.userId
    } 
  })
}

// 获取收藏知识的列表
export function fetchCollectKnowledge (option) {
  return request({
    url: `${rootUrl}finds`,
    method: 'post',
    data: {
      page: option.page || 1,
      rows: option.rows || 10,
      condition: {
        sort: option.sort || 'TIME',
        order: option.order || 'desc',
        auditing: option.auditing || '1',
        typeId: option.typeId,
        userId: option.userId
      }
    }
  })
}

// 取消收藏
export function deleteCollect (data) {
  return request({
    url: `${rootUrl}delete`,
    method: 'post',
    data
  })
}

// 收藏知识 / 移动收藏
export function saveCollect (data) {
  return request({
    url: `${rootUrl}save`,
    method: 'post',
    data
  })
}