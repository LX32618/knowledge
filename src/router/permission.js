import { getToken, setToken } from '@/utils/auth'
import store from '@/store'
import user from '../store/modules/user'

// 获取用户信息
async function getUser (next) {
  try {
    user = await store.dispatch('user/getInfo')
  } catch(_) {
    // 获取用户信息失败重定向到登录页面
    // window.location.href = `/cas/login?redirect=${redirect}`
  }
}

const routerGuide = async (to, from, next) => {
  // 设置网站title
  document.title = `${to.meta.title} | 知识工程`

  const token = getToken()

  // 与平台对接用
  if (token) {
    let user = store.getters.userInfo
    if (!user) {
      await getUser(next)
    }
    
    // redirect ? next(redirect) : next({ path: '/' })
  } else {
    const { redirect, jsessionid } = to.query
    if (!jsessionid) {
      // 无token且无JSESSIONID时重定向到登录页面
      window.location.href = `/cas/login?redirect=${to.path}`
      return
    }
    setToken(jsessionid)
    await getUser(next, redirect)
  }
  to.query.jsessionid ? next({ path: '/' }) : next()

  // 未使用统一认证平台调试用
  // 已登录
  // if (token && token !== 'undefined') {
  //   if (to.path === '/login') {
  //     next({ path: '/' })
  //   } else {
  //     let user = store.getters.userInfo
  //     if (!user) {
  //       try {
  //         user = await store.dispatch('user/getInfo')
  //       } catch (_) {
  //         return next({ path: '/login' })
  //       }
  //     }
  //   }
  //   // 未登录
  // } else {
  //   if (to.path === '/login') {
  //     return next()
  //   } else {
  //     return next(`/login?redirect=${to.path}`)
  //   }
  // }
  // next()
}

export {
  routerGuide
}
