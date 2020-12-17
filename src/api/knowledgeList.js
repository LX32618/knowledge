import request from '@/utils/request'

const testUrl = '/api/tableConfig/'
const rootUrl = '/knowledgeReport/'


//获取列表配置
export function fetchTableConfigTest (option) {
    return request({
        url: `${testUrl}getConfig`,
        method: 'post',
        data: option
    })
}

//获取列表配置
export function fetchTableConfig (option) {
    return request({
        url: `${rootUrl}get`,
        method: 'post',
        data: option
    })
}

export function saveTableConfig(option) {
    return request({
        url: `${rootUrl}save`,
        method: 'post',
        data: option
    })
}
