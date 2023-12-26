import { login, logout, type LoginData } from '@/api/user'
import { useUserStore } from '@/store'
import { clearToken, setToken } from '@/utils/token'
import { removeRouteListener } from '@/utils/routerListener'
/**
 *
 * @desc system authentication
 */
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
    const afterLogout = () => {
      userStore.resetUserInfo()
      clearToken()
      removeRouteListener()
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
