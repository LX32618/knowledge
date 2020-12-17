import { treeRequest } from '@/utils/request'

// 获取字典树
export function fetchDictTree (option) {
  return treeRequest({
    url: `/dicTree/get`,
    method: 'post',
    data: {
      id: option.id
    }
  })
}

// 获取收藏目录树
export function fetchCollectTree (option) {
  return treeRequest({
    url: `/collectTree/findZtree`,
    method: 'post',
    data: {
      rootid: option.id,
      userId: option.userId
    }
  })
}

// 新增 / 编辑树节点
export function saveTreeNode (data) {
  return treeRequest({
    url: `/treeNode/save`,
    method: 'post',
    data
  })
}

// 删除树节点
export function deleteTreeNode (data) {
  return treeRequest({
    url: `/treeNode/delete`,
    method: 'post',
    data
  })
}
