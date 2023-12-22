import type { Router } from 'vue-router'
import NProgress from 'nprogress'
import { useUserStore } from '@/store'
import { isLogin } from '@/hooks/token'
import { AppRouteNames } from '@/types/constants'
import useAuth from '@/hooks/auth'

/**
 *
 * @desc userInfo and token guard
 * - no token to login view
 * - has token check userInfo
 * - - has userInfo go
 * - - no userInfo update info go
 */
export default function setupUserLoginInfoGuard(router: Router) {
  const { logoutApp } = useAuth()
  router.beforeEach(async (to, _from, next) => {
    NProgress.start()
    const userStore = useUserStore()
    if (isLogin()) {
      if (userStore.userInfo.role) {
        next()
      } else {
        try {
          await userStore.refreshUserInfo()
          next()
        } catch (error) {
          await logoutApp()
          next({
            name: AppRouteNames.login
          })
        }
      }
    } else {
      if (to.name === AppRouteNames.login) {
        next()
        return
      }
      next({
        name: AppRouteNames.login
      })
    }
  })
}