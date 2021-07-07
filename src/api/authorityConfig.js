import request from '@/utils/request'


//获取权限列表
export function fetchPermissionList (option) {
    return request({
        url: "/permissionRules/get",
        method: 'post',
        data: option
    })
}

//更新创建人相关权限
export function updateCreatorPermission(option){
    return request({
        url: "/creatorPermission/update",
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

//删除权限列表
export function removePermission (option) {
    return request({
        url: "/permissionRules/delete",
        method: 'post',
        data: option
    })
}

// 校验是否有单条知识的查看权限
export function hasKnowledgePermission (knowledgeId) {
    return request({
        url: '/hasKnowledgePermission',
        method: 'post',
        data: {
            knowledgeId
        }
    })
}
