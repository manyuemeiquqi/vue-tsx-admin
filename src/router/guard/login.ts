import type { Router, LocationQueryRaw } from 'vue-router'
import NProgress from 'nprogress'
import { useUserStore } from '@/store'
import { isLogin } from '@/utils/auth'
import { ApplicationRouteName } from '@/types/enum'
/**
 *
 * @desc userInfo and token guard
 * - no token to login view
 * - has token check userInfo
 * - - has userInfo go
 * - - no userInfo update info go
 */
export default function setupUserLoginInfoGuard(router: Router) {
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
          await userStore.logoutApp()
          next({
            name: ApplicationRouteName.login
          })
        }
      }
    } else {
      if (to.name === ApplicationRouteName.login) {
        next()
        return
      }
      next({
        name: ApplicationRouteName.login
      })
    }
  })
}
