import request from '@/utils/request'

const rootUrl = '/solr/solrController/'

export function solrSearch (option) {
  return request({
    url: `${rootUrl}search`,
    method: 'post',
    data: {
      page: option.page || 1,
      rows: option.rows || 20,
      condition: {
        searchText: option.searchText || '',
        searchLibrary: option.searchLibrary || '',
        searchType: option.searchType
      }
    } 
  })
}
