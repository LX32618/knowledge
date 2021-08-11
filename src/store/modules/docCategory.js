import { fetchCategoryTreeAll, fetchCategoryTreeWithUserPermission } from '@/api/docCategory'

const state = {
  docCategories: [],
  userDocCategories: []
}

const mutations = {
  FETCH_CATEGORIES: (state, data) => {
    state.docCategories = data
  },
  FETCH_USER_CATEGORIES: (state, data) => {
    state.userDocCategories = data
  }
}

const actions = {
  // 获取所有知识库根目录
  fetchCategories ({ commit }) {
    return new Promise((resolve, reject) => {
      const id = 'E91AE12C441D468F875A236FFB034A98'
      fetchCategoryTreeAll({ id }).then(response => {
        const data = response.content
        commit('FETCH_CATEGORIES', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取有权限的知识库目录
  fetchUserCategories ({ commit }) {
    return new Promise((resolve, reject) => {
      const id = 'E91AE12C441D468F875A236FFB034A98'
      fetchCategoryTreeWithUserPermission({ id }).then(response => {
        const data = response.content
        commit('FETCH_USER_CATEGORIES', data)
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
