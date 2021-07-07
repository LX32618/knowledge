import request from '@/utils/request'

const rootUrl = '/process-binding/'

//获取流程模板绑定列表
export function fetchProcessBindList (option) {
    return request({
        url: `${rootUrl}get`,
        method: 'post',
        data: option
    })
}

//保存流程模板绑定列表
export function saveProcessBind (option) {
    return request({
        url: `${rootUrl}post`,
        method: 'post',
        data: option
    })
}

//删除流程模板绑定列表
export function deleteProcessBind (option) {
    return request({
        url: `${rootUrl}delete`,
        method: 'post',
        data: option
    })
}
