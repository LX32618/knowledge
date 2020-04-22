const rootPath = '/api/users/'

const users = [
  {
    username: 'admin',
    name: '系统管理员',
    token: 'admin-token',
    roles: [0, 1]
  },
  {
    username: 'user',
    name: '普通用户',
    token: 'user-token',
    roles: [1]
  }
]

export default [
  // 登录
  {
    url: `${rootPath}login`,
    type: 'post',
    response: config => {
      const { username } = config.body

      const user = users.find(item => item.username === username)

      if (!user) {
        return {
          status: -1,
          msg: '用户名或密码错误'
        }
      }

      return {
        status: 0,
        data: { token: user.token }
      }
    }
  },
  // 登出
  {
    url: `${rootPath}logout`,
    type: 'get',
    response: _ => {
      return {
        status: 0
      }
    }
  },
  // 获取用户信息
  {
    url: /\/info.*/,
    type: 'get',
    response: config => {
      const { token } = config.query
      const user = users.find(item => item.token === token)

      if (!user) {
        return {
          status: -1,
          msg: '登录已过期'
        }
      }
      return {
        status: 0,
        data: user
      }
    }
  }
]
