import request from '@/utils/request'

const rootUrl = '/permission/sysPermissionsController/'


export function fetchPriorities(option) {
    return request({
        url: `${rootUrl}getData`,
        method: 'post',
        data: option
    })
}



export function fetchPrioritiesSelected(option) {
    return request({
        url: `${rootUrl}getMenuAndRole`,
        method: 'post',
        data: option
    })
}


export function savePriorities(option) {
    return request({
        url: `${rootUrl}save`,
        method: 'post',
        data: option
    })
}


export function removePriorities(option) {
    return request({
        url: `${rootUrl}deletePermissionById`,
        method: 'post',
        data: option
    })
}
