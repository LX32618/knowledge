import Cookies from 'js-cookie'

const TokenKey = 'JSESSIONID'

// export function getToken () {
//   return Cookies.get(TokenKey, { path: '/' })
// }

// export function setToken (token) {
//   return Cookies.set(TokenKey, token, { path: '/' })
// }

// export function removeToken () {
//   return Cookies.remove(TokenKey, { path: '/' })
// }

export function getToken () {
  return localStorage.getItem(TokenKey)
}

export function setToken (token) {
  localStorage.setItem(TokenKey, token)
}

export function removeToken () {
  localStorage.removeItem(TokenKey)
}

// export function getSessionKey () {
//   return Cookies.get(SessionKey)
// }

// export function setSessionKey (SessionKey) {
//   return Cookies.set(SessionKey, token)
// }

// export function removeSessionKey () {
//   return Cookies.remove(SessionKey)
// }
