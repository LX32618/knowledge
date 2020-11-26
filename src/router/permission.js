import { getToken, setToken, removeToken} from '@/utils/auth'
import store from '@/store'

// 获取用户信息
// async function getUser () {
//   try {
//     const user = await store.dispatch('user/getInfo')
//     if (!user) {
//       throw new Error('无法获取用户信息')
//     }
//   } catch(err) {
//     // 获取用户信息失败重定向到登录页面
//     removeToken()
//     window.location.href = `/cas/login?redirect=${redirect}`
//   }
// }

const routerGuide = async (to, from, next) => {
  // 设置网站title
  document.title = `${to.meta.title} | 知识工程`
  
  const token = getToken()

  // 与平台对接用
  if (token) {
    const hasMenu = Object.keys(store.getters.sidebar).length > 0 && Object.keys(store.getters.sidebarRouter).length > 0
    if (hasMenu) {
      next();
    } else {
      try {
        const user = await store.dispatch('user/getInfo');

        if (!user) {
          throw new Error('无法获取用户信息')
        }

        await store.dispatch('routerMenu/getRouterMenu', 'F36A946243D34506A6BE625412739725');
        next()
      } catch (error) {
        removeToken()
        window.location.href = `/cas/login?redirect=${to.path}`
      }
    }
  } else {
    const { redirect, jsessionid } = to.query
    if (!jsessionid) {
      // 无token且无JSESSIONID时重定向到登录页面
      removeToken()
      window.location.href = `/casKnowledge/login?redirect=${to.path}`
      return
    }
    setToken(jsessionid)
    next({ path: to.path })
  }
}

export {
  routerGuide
}
