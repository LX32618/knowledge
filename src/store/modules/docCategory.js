import { fetchCategoryTree } from '@/api/docCategory'

const state = {
  docCategories: []
}

const mutations = {
  FETCH_CATEGORIES: (state, data) => {
    state.docCategories = data
  }
}

const actions = {
  // 获取所有知识库根目录
  fetchCategories ({ commit }) {
    return new Promise((resolve, reject) => {
      const id = 'E91AE12C441D468F875A236FFB034A98'
      fetchCategoryTree({ id }).then(response => {
        const data = response.content
        commit('FETCH_CATEGORIES', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
