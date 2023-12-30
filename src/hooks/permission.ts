import { useUserStore } from '@/store'
import { cloneDeep, get } from 'lodash'
import type {
  RouteLocationNormalizedLoaded,
  RouteRecordNormalized,
  RouteRecordRaw
} from 'vue-router'

export default function usePermission() {
  const userStore = useUserStore()
  return {
    checkRoutePermission(
      route: RouteRecordRaw | RouteRecordNormalized | RouteLocationNormalizedLoaded
    ) {
      const requiresAuth = get(route, 'meta.requiresAuth')
      const needRoles = (get(route, 'meta.roles') || []) as string[]
      return (
        !requiresAuth ||
        needRoles.length === 0 ||
        needRoles.includes('*') ||
        needRoles.includes(userStore.role)
      )
    },

    checkButtonPermission(needPermission: string[]): boolean {
      const userStore = useUserStore()
      return needPermission.includes(userStore.role)
    }
  }
}
