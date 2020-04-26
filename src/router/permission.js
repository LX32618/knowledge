import { getToken } from '@/utils/auth'
import store from '@/store'

const routerGuide = async (to, from, next) => {
  // 设置网站title
  document.title = `${to.meta.title} | 知识工程`

  const token = getToken()
  // 已登录
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      let user = store.getters.userInfo
      if (!user) {
        user = await store.dispatch('user/getInfo')
      }
      if (!user) {
        next({ path: '/login' })
      }
      // const routes = store.getters.routes
      // if (!routes || routes.length === 0) {
      //   store.commit('app/SET_ROUTES')
      // }
      // // 判断用户权限
      // if (to.meta.admin && role !== 0) {
      //   next('/noPerimission')
      // } else {
      //   next()
      // }
      next()
    }
    // 未登录
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
  next()

}

export {
  routerGuide
}
