import Mock from 'mockjs'
const rootPath = '/api/users/'

const users = [
  {
    username: 'admin',
    name: '系统管理员',
    token: 'admin-token',
    department: '流程与信息化部',
    email: 'admin@mei29.scgb.com',
    phone: '028-87552252',
    roles: [0, 1]
  },
  {
    username: 'user',
    name: '普通用户',
    token: 'user-token',
    department: '流程与信息化部',
    roles: [1]
  }
]

const messageList = []

for (let i = 0; i < 3; ++i) {
  messageList.push(Mock.mock({
    id: '@increment',
    title: '@title',
    content: '@sentence',
    createDate: +Mock.Random.date('T')
  }))
}

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
          status: 'fail',
          message: '用户名或密码错误'
        }
      }

      return {
        status: 'success',
        content: { token: user.token }
      }
    }
  },
  // 登出
  {
    url: `${rootPath}logout`,
    type: 'get',
    response: _ => {
      return {
        status: 'success'
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
          status: 'fail',
          message: '登录已过期'
        }
      }
      return {
        status: 'success',
        content: user
      }
    }
  },
  // 消息列表
  {
    url: /\/users\/messages.*/,
    type: 'get',
    response: config => {
      // const { id } = config.query
      return {
        status: 'success',
        content: messageList
      }
    }
  },
]
