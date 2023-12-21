import { setRouteEmitter } from '@/utils/routerListener'
import type { Router } from 'vue-router'
import setupUserLoginInfoGuard from './login'
import setupPermissionGuard from './permission'

/**
 *
 * @param desc emit router change
 */
function setupPageGuard(router: Router) {
  router.beforeEach((to) => {
    setRouteEmitter(to)
  })
}

export default function configRouteGuard(router: Router) {
  setupPageGuard(router)
  setupUserLoginInfoGuard(router)
  setupPermissionGuard(router)
}
