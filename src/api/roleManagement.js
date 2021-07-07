import request from '@/utils/request'

const rootUrl = '/sysRole/sysRoleController/'


export function fetchRoleList(option) {
    return request({
        url: `${rootUrl}getData`,
        method: 'post',
        data: option
    })
}
