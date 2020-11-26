import request from '@/utils/request'

const rootUrl = '/api/formMaking/'
const rootUrl1 = '/api1/system/knowledgeDataController/'
const templateUrl = '/api1//system/KnowledgeFormTemplateController/'


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

export function fetchTemplate(option)
{
    return request({
        url: `${templateUrl}getTemplate`,
        method: 'post',
        data: option
    })
}


export function saveTemplate(option)
{
    return request({
        url: `${templateUrl}saveTemplate`,
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
