import { getToken, setToken, removeToken } from '@/utils/auth'
import { getInfo, logout } from '@/api/user'

const state = {
  token: getToken(),
  userInfo: undefined
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INFO: (state, info) => {
    state.userInfo = info
  },
  REMOVE_TOKEN: (state) => {
    removeToken()
    state.token = ''
  }
}

const actions = {
  // 用户登录
  // login ({ commit }, userInfo) {
  //   const { username, password } = userInfo
  //   return new Promise((resolve, reject) => {
  //     login({ username: username.trim(), password }).then(response => {
  //       const data = response.content
  //       commit('SET_TOKEN', data.token)
  //       setToken(data.token)
  //       resolve()
  //     }).catch(error => {
  //       console.log('error')
  //       reject(error)
  //     })
  //   })
  // },
  // 用户登出
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(_ => {
        commit('SET_TOKEN', '')
        commit('SET_INFO', undefined)
        // removeToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取用户个人信息
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        let data = response
        if (!response.token) {
          reject(new Error('用户登录已过期'))
        }
        data = {
          id: 'EFB3BCDFBC0B4B5B91991B49B96D26CF',
          username: 'admin',
          name: '系统管理员',
          token: 'admin-token',
          department: '流程与信息化部',
          email: 'admin@mei29.scgb.com',
          phone: '028-87552252',
          roles: [0, 1]
        }
        commit('SET_INFO', data)
        resolve(data)
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
