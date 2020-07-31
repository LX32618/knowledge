import request from '@/utils/request'

const rootUrl = '/api/formMaking/'


//获取浏览按钮
export function fetchViewBtns (option) {
    return request({
        url: `${rootUrl}getviewBtn`,
        method: 'post',
        data: option
    })
}
