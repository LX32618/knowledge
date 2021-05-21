import request from '@/utils/request'

const rootUrl = '/permission/'

// 获取分享/申请知识列表
export function getSharedKnowledge (option) {
  return request({
    url: `${rootUrl}PermissionAppliedController/getShare`,
    method: 'post',
    data: {
      page: option.page || 1,
      rows: option.rows || 10,
      condition: {
        sort: 'CREATEDATE',
        order: 'desc',
        status: option.status,
        share: option.share,
        shareId: option.shareId
      }
    } 
  })
}

// 分享知识
export function saveShare (data) {
  return request({
    url: `${rootUrl}PermissionAppliedController/save`,
    method: 'post',
    data
  })
}
