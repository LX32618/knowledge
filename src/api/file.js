import request from '@/utils/request'

export function viewFile (params) {
  return request({
    url: '/viewImage',
    params
  })
}

export function downloadFile (data) {
  return request({
    url: '/downloadFile/post',
    method: 'post',
    data,
    responseType: 'blob'
  })
}

export function uploadFile (data) {
  return request({
    url: '/upLoadFile/post',
    method: 'post',
    data
  })
}

export function getAttachInfo (ids) {
  return request({
    url: '/attachInfo/get',
    method: 'post',
    data: {
      ids
    }
  })
}

export function getFileUrl (attachid) {
  return request({
    url: '/attachmentPreview',
    method: 'get',
    params: {
      attachid
    }
  })
}
