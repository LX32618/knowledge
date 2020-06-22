import request from '@/utils/request'

const rootUrl = '/api4/app/authcenter/api/knowledgeSubscribe/'

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
