import request from '@/utils/request'

const rootUrl = "/projectGroup/";


//获取临时项目组
export function fetchGroupList (option) {
    return request({
        url: `${rootUrl}get`,
        method: 'post',
        data: option
    })
}

//保存临时项目组
export function saveGroupList (option) {
    return request({
        url: `${rootUrl}save`,
        method: 'post',
        data: option
    })
}

//删除临时项目组
export function removeGroup (option) {
    return request({
        url: `${rootUrl}delete`,
        method: 'post',
        data: option
    })
}
