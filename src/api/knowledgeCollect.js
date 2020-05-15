import request from '@/utils/request'

const rootUrl = '/api1/knowledgeCollect/'

// 获取收藏知识总条数
export function fetchCollectKnowledgeCount (option) {
  return request({
    url: `${rootUrl}count`,
    method: 'get',
    params: {
      userId: option.userId,
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
