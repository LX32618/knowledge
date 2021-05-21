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
