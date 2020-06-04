import request from '@/utils/request'

const rootUrl = '/api1/system/knowledgeDataController/'

// 获取知识模型配置信息
export function getModelAndData (option) {
  return request({
    url: `${rootUrl}getModelAndData`,
    method: 'post',
    data: {
      knowledgeId: option.id
    } 
  })
}
