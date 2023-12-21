import { login, logout, type LoginData } from '@/api/user'
import { useApplicationStore, useUserStore } from '@/store'
import { clearToken, setToken } from '@/utils/auth'
import { removeRouteListener } from '@/utils/routerListener'

export default function useAuth() {
  const loginApp = async (data: LoginData) => {
    try {
      const res = await login(data)
      setToken(res.data.token)
    } catch (err) {
      clearToken()
      throw err
    }
  }

  const logoutApp = async () => {
    const userStore = useUserStore()
    const applicationStore = useApplicationStore()
    const afterLogout = () => {
      userStore.resetUserInfo()
      clearToken()
      removeRouteListener()
      applicationStore.clearServerMenu()
    }
    try {
      await logout()
    } finally {
      afterLogout()
    }
  }
  return {
    loginApp,
    logoutApp
  }
}
