import request from '@/utils/request'

const rootUrl = '/knowledgeversion/KnowledgeVersionController/'

export function createKnowledgeVersion (baseId) {
  return request({
    url: `${rootUrl}index`,
    method: 'post',
    data: {
      baseId
    }
  })
}

export function getKnowledgeVersions (baseId) {
  return request({
    url: `${rootUrl}versions`,
    method: 'post',
    data: {
      baseId
    }
  })
}
