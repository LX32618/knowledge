import request from '@/utils/request'

const rootUrl = '/knowledgeversion/KnowledgeVersionController/'

export function createKnowledgeVersion (basId) {
  return request({
    url: `${rootUrl}index`,
    method: 'post',
    data: {
      basId
    }
  })
}
