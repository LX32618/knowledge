import request from '@/utils/request'

const rootUrl = '/KnowledgeManagerController/'


export function fetchKnowledgeAdministrator(option) {
    return request({
        url: `${rootUrl}getData`,
        method: 'post',
        data: option
    })
}

export function fetchKnowledgeAdministratorList(option) {
    return request({
        url: `${rootUrl}getManagerListByRoleId`,
        method: 'post',
        data: option
    })
}

export function fetchCategoryTreeSync(option) {
    return request({
        url: `${rootUrl}getCategoryTreeSync`,
        method: 'post',
        data: option
    })
}


export function saveKnowledgeAdministrator(option) {
    return request({
        url: `${rootUrl}saveManager`,
        method: 'post',
        data: option
    })
}



export function removeKnowledgeAdministrator(option) {
    return request({
        url: `${rootUrl}deleteKnowManager`,
        method: 'post',
        data: option
    })
}
