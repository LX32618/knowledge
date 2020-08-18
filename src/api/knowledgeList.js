import request from '@/utils/request'

const testUrl = '/api/tableConfig/'


//获取浏览按钮
export function fetchTableConfigTest (option) {
    return request({
        url: `${testUrl}getConfig`,
        method: 'post',
        data: option
    })
}

