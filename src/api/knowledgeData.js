import request from '@/utils/request'

const rootUrl = '/api4/system/knowledgeDataController/'

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

// 新建知识
export function saveBaseData (knowledge, creator, baseId) {
  const data = Object.assign({}, knowledge)
  data.creator = creator
  data.baseId = baseId
  data.createDate = new Date()

  return request({
    url: `${rootUrl}saveBaseData`,
    method: 'post',
    data
  })
}

// 保存知识
export function saveData (data) {
  console.log(data)
  return request({
    url: `${rootUrl}saveData`,
    method: 'post',
    data
  })
}
