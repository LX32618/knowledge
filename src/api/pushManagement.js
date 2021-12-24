import request from '@/utils/request'

const rootUrl = '/'

//获取推送开关状态
export function fetchPushSwitch (option) {
    return request({
        url: `${rootUrl}batchGetPushSwitch/get`,
        method: 'post',
        data: option
    })
}

//更新推送开关状态
export function updatePushSwitch (option) {
    return request({
        url: `${rootUrl}batchUpdatePushSwitch`,
        method: 'post',
        data: option
    })
}
