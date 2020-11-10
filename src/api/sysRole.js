import request from '@/utils/request'

const rootUrl = '/api1/sysRole/'

// 获取分享/申请知识列表
export function getSharedKnowledge (option) {
  return request({
    url: `${rootUrl}sysPermissionsController/getShare`,
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