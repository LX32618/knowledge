import request from '@/utils/request'

const rootUrl = '/sysComment/CommentsController/'

// 根据知识Id获取评论
export function findCommentsByKnowledgeId (knowledgeId) {
  return request({
    url: `${rootUrl}findByCondition`,
    method: 'post',
    data: {
      knowledgeId
    }
  })
}

// 用户评论
export function saveComment (data) {
  return request({
    url: `${rootUrl}saveComment`,
    method: 'post',
    data
  })
}

// 删除评论
export function deleteComment (id) {
  return request({
    url: `${rootUrl}deleteComment`,
    method: 'post',
    data: {
      id
    }
  })
}
