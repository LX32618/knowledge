import request from '@/utils/request'

const rootUrl = '/api4/SysMenuInfoController/'

export function fetchMenuByUser (option) {
    return request({
        url: `${rootUrl}getMenu`,
        method: 'post',
        data: option
    })
}

export function fetchMenuAll() {
    return request({
        url: `${rootUrl}getMenuAll`,
        method: 'post',
        data: {}
    })
}

export function deleteMenu(option) {
    return request({
        url: `${rootUrl}delete`,
        method: 'post',
        data: option
    })
}

export function saveMenu (option) {
    return request({
        url: `${rootUrl}save`,
        method: 'post',
        data: option
    })
}
