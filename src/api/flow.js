import request, { fmsBasicRequest } from '@/utils/request'

export function startFlow (processDefinitionId, knowledgeId) {
  return fmsBasicRequest({
    url: '/customWorkFlowFormConfigController.do?startProcess',
    method: 'get',
    params: {
      // startProcess: null,
      processDefinitionId,
      oid: knowledgeId
    }
  })
}

export function fetchProcessId (knowledgeId, processKindType = 'inBound') {
  return request({
    url: '/process-binding-by-knowledgeId/get',
    method: 'post',
    data: {
      knowledgeId,
      processKindType
    }
  })
}
