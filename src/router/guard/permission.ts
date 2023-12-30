import NProgress from 'nprogress' // progress bar
import type { RouteRecord, Router } from 'vue-router'

import usePermission from '@/hooks/permission'

import { ViewNames } from '@/types/constants'
import useAppRoute from '@/hooks/appRoute'

export default function setupPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const Permission = usePermission()
    const permissionsAllow = Permission.checkRoutePermission(to as unknown as RouteRecord)
    const { firstPermissionRoute } = useAppRoute()
    // eslint-disable-next-line no-lonely-if
    if (permissionsAllow) next()
    else {
      const destination = firstPermissionRoute.value?.name || ViewNames.notFound
      next({ name: destination })
    }
    NProgress.done()
  })
}
