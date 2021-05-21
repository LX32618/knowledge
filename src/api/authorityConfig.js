import request from '@/utils/request'


//获取权限列表
export function fetchPermissionList (option) {
    return request({
        url: "/permissionRules/get",
        method: 'post',
        data: option
    })
}

//保存权限列表
export function savePermission (option) {
    return request({
        url: "/permissionRules/save",
        method: 'post',
        data: option
    })
}
