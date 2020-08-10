import request from '@/utils/request'

const rootUrl = '/api/formMaking/'
const rootUrl1 = '/api5/system/knowledgeDataController/'


//获取浏览按钮
export function fetchViewBtns (option) {
    return request({
        url: `${rootUrl}getviewBtn`,
        method: 'post',
        data: option
    })
}

export function fetchModel(option)
{
    return request({
        url: `${rootUrl1}getModel`,
        method: 'post',
        data: option
    })
}

export function fetchTestModel(option)
{
    return request({
        url: `${rootUrl}getModel`,
        method: 'post',
        data: option
    })
}
