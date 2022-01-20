import request from '@/utils/request'


const rootUrl = '/sys-depart-info/'
const rootUrl1 = '/groupInfo/'

//获取部门列表
export function fetchDepartmentInfoById (option) {
    return request({
        url: `${rootUrl}get`,
        method: 'post',
        data: option
    })
}

//获取部门列表,用于应付检查
export function fetchDepartmentInfoById1 (option) {
    return request({
        url: `${rootUrl1}get`,
        method: 'post',
        data: option
    })
}
