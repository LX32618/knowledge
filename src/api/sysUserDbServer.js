import request from '@/utils/request'

export function getUserInfoByLoginName (userName) {
  return request({
    url: '/sys-user-info-by-loginName/get',
    method: 'post',
    data: {
      userName
    }
  })
}
