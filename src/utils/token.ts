import { LocalStorageKey } from '@/types/constants'

const tokenKey = LocalStorageKey.tokenKey

const isLogin = () => {
  return !!localStorage.getItem(tokenKey)
}

const getToken = () => {
  return localStorage.getItem(tokenKey)
}

const setToken = (token: string) => {
  localStorage.setItem(tokenKey, token)
}

const clearToken = () => {
  localStorage.removeItem(tokenKey)
}

export { isLogin, getToken, setToken, clearToken }
