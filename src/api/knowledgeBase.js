import request from '@/utils/request'

const rootUrl = '/system/knowledge/'

// 获取我的知识总数
export function fetchKnowledgeCount (option) {
  return request({
    url: `${rootUrl}count`,
    method: 'post',
    data: {
      auditStatus: '1',
      createId: option.createId,
      order: 'descs'
    }
  })
}

// 获取最新知识列表/获取我的知识列表
export function findKnowledges (option) {
  return request({
    url: `${rootUrl}find`,
    method: 'post',
    data: {
      page: option.page || 1,
      rows: option.rows || 10,
      condition: {
        sort: option.sort || 'CREATEDATE',
        order: option.order || 'desc',
        auditing: option.auditing || '1',
        isApplyDel: option.isApplyDel,
        knowledgeLock: option.knowledgeLock,
        typeId: option.typeId,
        creator: option.creator
      }
    }
  })
}

// 获取热点知识列表
export function findHotKnowledges (option={}) {
  return request({
    url: `${rootUrl}findKnowledgeCount`,
    method: 'post',
    data: {
      page: option.page || 1,
      rows: option.rows || 10,
      condition: {
        sort: option.sort || 'REUSERATION',
        order: option.order || 'desc',
        auditing: option.auditing || '1',
        hot: '1'
      }
    }
  })
}

// 获取删除知识列表
export function getRecycleKnowledge (option={}) {
  return request({
    url: `${rootUrl}getRecycleDate`,
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

// 删除知识还原
export function revertKnowledge (option={}) {
  return request({
    url: `${rootUrl}revertKnowledge`,
    method: 'post',
    data: option
  })
}

// 逻辑删除知识
export function deleteKnowledge (option={}) {
  return request({
    url: `${rootUrl}delete`,
    method: 'post',
    data: option
  })
}

// 物理删除知识
export function reDeleteKnowledge (option={}) {
  return request({
    url: `${rootUrl}reDelete`,
    method: 'post',
    data: option
  })
}

// 知识审核
export function passKnowledge (option={}) {
  return request({
    url: `${rootUrl}passKnowledge`,
    method: 'post',
    data: option
  })
}

// 知识发布
export function releaseKnowledge (ids) {
  return request({
    url: `${rootUrl}releaseAll`,
    method: 'post',
    data: {
      ids
    }
  })
}

// 更新知识生命周期状态
export function updateDataLifeCycle (ids, auditing = '1') {
  return request({
    url: `${rootUrl}dataLifeCycle`,
    method: 'post',
    data: {
      ids,
      auditing
    }
  })
}
