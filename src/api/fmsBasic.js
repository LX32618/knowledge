import axios from 'axios'

const rootUrl = '/fms-basic/'
const request = axios.create({
  withCredentials: true,
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
    url: `${rootUrl}logout.do`,
    method: 'post',
    params: {
      casDemo: 'http://www.baidu.com'
    }
  })
}

export function test () {
  const data = {
    searchName: '',
    searchKey: '',
    ifPage: '',
    page: '',
    rows: ''
  }
  return request({
    url: `${rootUrl}feign/activitiRestController/queryEnableFlowList.do`,
    method: 'post',
    data: genFormData(data)
  })
}

function genFormData (data) {
  const formData = new FormData()
  for (let key of Object.keys(data)) {
    formData.append(key, data[key])
  }
  return formData
}
