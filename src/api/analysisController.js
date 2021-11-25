import request from '@/utils/request'


const rootUrl = '/asset/AnalysisController/'

//获取部门贡献率
export function fetchOrgContribution (option) {
    return request({
        url: `${rootUrl}findContributionCountByCATE`,
        method: 'post',
        data: option
    })
}


//获取个人贡献率
export function fetchIndContribution (option) {
    return request({
        url: `${rootUrl}findContributionCountByUser`,
        method: 'post',
        data: option
    })
}

//获取点击率
export function fetchClickRate (option) {
    return request({
        url: `${rootUrl}findKnowledgeCount`,
        method: 'post',
        data: option
    })
}

//获取重用率
export function fetchReuseRate (option) {
    return request({
        url: `${rootUrl}findKnowledgeReuseCount`,
        method: 'post',
        data: option
    })
}

//获取知识数量统计
export function fetchIndKnowledgeCount (option) {
    return request({
        url: `${rootUrl}getData`,
        method: 'post',
        data: option
    })
}

