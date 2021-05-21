import request from '@/utils/request'


const rootUrl = '/sys-depart-info/'

//获取部门列表
export function fetchDepartmentInfoById (option) {
    return request({
        url: `${rootUrl}get`,
        method: 'post',
        data: option
    })
}
