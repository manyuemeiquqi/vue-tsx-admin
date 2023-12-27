import NProgress from 'nprogress' // progress bar
import type { Router } from 'vue-router'

import usePermission from '@/hooks/permission'
import { useAppStore, useUserStore } from '@/store'
import { appRoutes } from '../routes'
import { NOT_FOUND_ROUTE } from '@/types/constants'

export default function setupPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const appStore = useAppStore()
    const userStore = useUserStore()
    const Permission = usePermission()
    const permissionsAllow = Permission.checkRoutePermission(to)

    // eslint-disable-next-line no-lonely-if
    if (permissionsAllow) next()
    else {
      const destination =
        Permission.findFirstPermissionRoute(appRoutes, userStore.role) ?? NOT_FOUND_ROUTE

      next(destination)
    }
    NProgress.done()
  })
}
