import { getToken, setToken, removeToken } from '@/utils/auth'
import { getInfo, logout, isIpValid } from '@/api/user'
import { getUserInfoByLoginName } from '@/api/sysUserDbServer'

const state = {
  token: getToken(),
  userInfo: undefined,
  ipValid: false
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INFO: (state, info) => {
    state.userInfo = info
  },
  SET_IP_VALID: (state, ipValid) => {
    state.ipValid = ipValid
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
    return new Promise(async (resolve, reject) => {
      try {
        const response = await getInfo(state.token)
        let data = response
        if (!response.token) {
          reject(new Error('用户登录已过期'))
        }
        const [username, , , ip] = response.token.split('###')
        let res = await isIpValid(ip)
        if (!res.content) {
          reject(new Error('ip'))
        }
        res = await getUserInfoByLoginName(username)
        if (!res.content) {
          reject(new Error('未找到用户'))
        }
        data = res.content
        commit('SET_INFO', data)
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
