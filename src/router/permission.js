import { getToken } from '@/utils/auth'
import store from '@/store'

const routerGuide = async (to, from, next) => {
  // 设置网站title
  document.title = `${to.meta.title} | 知识工程`

  const token = getToken()
  // 已登录
  if (token && token !== 'undefined') {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      let user = store.getters.userInfo
      if (!user) {
        try {
          user = await store.dispatch('user/getInfo')
        } catch (_) {
          return next({ path: '/login' })
        }
      }
    }
    // 未登录
  } else {
    if (to.path === '/login') {
      return next()
    } else {
      return next(`/login?redirect=${to.path}`)
    }
  }





  next()

}

export {
  routerGuide
}
