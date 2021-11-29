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

export function applyView (data) {
  return fmsBasicRequest({
    url: '/customWorkFlowFormConfigController.do?knowledgeApply',
    method: 'get',
    params: data
  })
}

export function knowledgeDelete (processDefinitionId, oid) {
  return fmsBasicRequest({
    url: '/customWorkFlowFormConfigController.do?knowledgeDelete',
    method: 'get',
    params: {
      processDefinitionId,
      oid
    }
  })
}
