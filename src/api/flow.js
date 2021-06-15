import { fmsBasicRequest } from '@/utils/request'

export function startFlow (processDefinitionId, knowledgeId) {
  return fmsBasicRequest({
    url: '/customWorkFlowFormConfigController.do',
    method: 'get',
    params: {
      getDynamicFormByFormKey: '',
      processDefinitionId,
      knowledgeId
    }
  })
}
