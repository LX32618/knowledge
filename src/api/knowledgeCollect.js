import request from '@/utils/request'

const rootUrl = '/api4/knowledgeCollect/'

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
export function fetchCollectKnowledge (data) {
  return request({
    url: `${rootUrl}finds`,
    method: 'post',
    data
  })
}
