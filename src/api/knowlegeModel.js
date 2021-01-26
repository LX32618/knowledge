import request from '@/utils/request'

// 根据字段ID获取字段类型信息
export function getKnowledgeFormFieldType (option) {
  return request({
    url: `${rootUrl}get`,
    method: 'post',
    data: {
      page: option.page || 1,
      rows: option.rows || 10,
      condition: {
        id: option.id,
        refName: option.refName || '',
        isMulti: option.isMulti || 0
      }
    } 
  })
}
