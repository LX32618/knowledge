import axios from 'axios'

const rootUrl = '/'
const request = axios.create({
  withCredentials: true,
  timeout: 30000
})

const request1 = axios.create({
  timeout: 30000
})

request.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json'
    return config
  }
)

export function logout () {
  return request({
    url: `${rootUrl}cas/logout`,
    method: 'post',
    params: {
      ssologin: 'http://192.168.4.200:8080/knowledge'
    }
  })
}


export function fetchFlowList(option) {
  return request({
    url: `${rootUrl}fms-basic/feign/customActivitiRestController/queryEnableFlowList.do`,
    method: 'post',
    data: genFormData(option)
  })
}

export function deployFlowList(option) {
  return request({
    url: `${rootUrl}fms-basic/feign/customActivitiRestController/deployProcessDefById.do`,
    method: 'post',
    data: genFormData(option)
  })
}

export function fetchProcessList(option) {
  return request({
    url: `${rootUrl}fms-basic/feign/customActivitiRestController/getProcessByprocessDefinitionId.do`,
    method: 'get',
    params:option
  })
}

export function startProcess(option) {
  return request1({
    url: `${rootUrl}fms-basic/feign/customActivitiRestController/startProcess.do`,
    method: 'post',
    params:option
  })
}


function genFormData (data) {
  const formData = new FormData()
  for (let key of Object.keys(data)) {
    formData.append(key, data[key])
  }
  return formData
}
