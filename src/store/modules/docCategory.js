import { findAllKnowlibrary } from '@/api/doc/docCategory'

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
      findAllKnowlibrary().then(response => {
        const data = response.data
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
