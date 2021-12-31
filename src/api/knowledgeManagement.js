import request from '@/utils/request'
import axios from "axios"

const rootUrl = '/'


//获取列表配置
export function fetchCategoryByNodeId(option) {
    return request({
        url: `${rootUrl}categoryKnowledgeItemsByNodeId_Old/get`,
        method: 'post',
        data: option
    })
}

//删除
export function deleteKnowledge(option) {
    return request({
        url: "/system/knowledge/delete",
        method: 'post',
        data: option
    })
}

//http://glaway.soft.net/knowledgeApi/knowledgeUpload/post

export function knowledgeUpload(option)
{
    return request({
        url: "/knowledgeUpload/post",
        method: 'post',
        data: option
    })
}



//获取列表配置
export function exportKnowExcel(option) {
    axios({
        method:"post",
        //url:`${rootUrl}knowledgeManageTemplate/get`,
        url:"/app-zuul/knowledge/app/authcenter/api/knowledgeManageTemplate/get",
        //url:"http://192.168.4.100:8083/app/authcenter/api/knowledgeManageTemplate/get",
        data:option,
        responseType:"blob",
    }).then(function (response) {

        let fileName1 = response.headers['content-disposition'].match(
            /fileName=(.*)/
        )[1]

         let fileName = decodeURIComponent(fileName1).split(".")[0]+".zip";

        // 将二进制流转为blob
        const blob = new Blob([response.data], { type: 'application/octet-stream' });
        //const blob = new Blob([response.data], { type: 'application/zip' });
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
            // 兼容IE，window.navigator.msSaveBlob：以本地方式保存文件
            window.navigator.msSaveBlob(blob, decodeURI(fileName))
        } else {
            // 创建新的URL并指向File对象或者Blob对象的地址
            const blobURL = window.URL.createObjectURL(blob)
            // 创建a标签，用于跳转至下载链接
            const tempLink = document.createElement('a');
            tempLink.style.display = 'none'
            tempLink.href = blobURL
            tempLink.setAttribute('download', fileName)
            // 兼容：某些浏览器不支持HTML5的download属性
            if (typeof tempLink.download === 'undefined') {
                tempLink.setAttribute('target', '_blank')
            }
            // 挂载a标签
            document.body.appendChild(tempLink)
            tempLink.click()
            setTimeout(()=>{
                document.body.removeChild(tempLink)
                // 释放blob URL地址
                window.URL.revokeObjectURL(blobURL)
            },300);
        }
    })
}




