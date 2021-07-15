import request from '@/utils/request'

const rootUrl = "/SysRefObjServer/";

//获浏览按钮的具体内容
export function fetchViewBtnDetail (option) {
    return request({
        url: `${rootUrl}browserData/get`,
        method: 'post',
        data: option
    })
}
