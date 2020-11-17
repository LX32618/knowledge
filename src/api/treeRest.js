import request from '@/utils/request'

const rootUrl = '/api2/'
const rootUrl2 = '/api3/'

// 获取字典树
export function fetchDictTree (option) {
  return request({
    url: `${rootUrl}dicTree/get`,
    method: 'post',
    data: {
      id: option.id
    }
  })
}

// 获取收藏目录树
export function fetchCollectTree (option) {
  return request({
    url: `${rootUrl2}collectTree/findZtree`,
    method: 'post',
    data: {
      rootid: option.id,
      userId: option.userId
    }
  })
}

// 新增 / 编辑树节点
export function saveTreeNode (data) {
  return request({
    url: `${rootUrl2}treeNode/save`,
    method: 'post',
    data
  })
}

// 删除树节点
export function deleteTreeNode (data) {
  return request({
    url: `${rootUrl2}treeNode/delete`,
    method: 'post',
    data
  })
}
