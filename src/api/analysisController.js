import request from '@/utils/request'


const rootUrl = '/asset/AnalysisController/'

//获取部门列表
export function fetchOrgContribution (option) {
    return request({
        url: `${rootUrl}findContributionCountByCATE`,
        method: 'post',
        data: option
    })
}
