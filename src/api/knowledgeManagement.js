import request from '@/utils/request'

const rootUrl = '/api4/app/authcenter/api/categoryKnowledgeItemsByNodeId/'


//获取列表配置
export function fetchCategoryByNodeId(option) {
    return request({
        url: `${rootUrl}get`,
        method: 'post',
        data: option
    })
}
