import request from '@/utils/request'

const rootUrl = '/api4/app/authcenter/api/knowledgeSubscribe/'

// 是否订阅知识 / 目录
export function isSubscribe (option) {
  return request({
    url: `${rootUrl}isSubscribe`,
    method: 'post',
    data: {
      id: option.id,
      type: option.type || '1', // 目录: 0 知识: 1
      userId: option.userId
    } 
  })
}

// 订阅知识 / 目录
export function subscribe (option) {
  return request({
    url: `${rootUrl}subscribe`,
    method: 'post',
    data: {
      id: option.id,
      type: option.type || '1', // 目录: 0 知识: 1
      userId: option.userId
    } 
  })
}

// 取消订阅知识 / 目录
export function cancelSubscribe (option) {
  return request({
    url: `${rootUrl}cancelSubscribe`,
    method: 'post',
    data: {
      ids: option.ids,
      userId: option.userId
    } 
  })
}

// 订阅知识列表
export function getSubscribedKnowledge (option) {
  return request({
    url: `${rootUrl}get`,
    method: 'post',
    data: {
      page: option.page || 1,
      rows: option.rows || 10,
      condition: {
        userId: option.userId
      }
    } 
  })
}
