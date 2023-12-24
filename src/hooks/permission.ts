import { useUserStore } from '@/store'
import { cloneDeep, get } from 'lodash'
import { type AppRouteRecordRaw } from '@/router/routes/types'
import type { RouteLocationNormalized } from 'vue-router'

export default function usePermission() {
  const userStore = useUserStore()
  return {
    routeHasPermission(route: AppRouteRecordRaw | RouteLocationNormalized) {
      const requiresAuth = get(route, 'meta.requiresAuth')
      const needRoles = get(route, 'meta.roles') || []
      return (
        !requiresAuth ||
        needRoles.length === 0 ||
        needRoles.includes('*') ||
        needRoles.includes(userStore.userInfo.role)
      )
    },
    // 层序遍历寻找第一个有权限 route
    findFirstPermissionRoute(_routes: any, role = 'admin') {
      const cloneRouters = cloneDeep(_routes)
      while (cloneRouters.length) {
        const firstElement = cloneRouters.shift()
        if (
          firstElement?.meta?.roles?.find((el: string[]) => {
            return el.includes('*') || el.includes(role)
          })
        )
          return { name: firstElement.name }
        if (firstElement?.children) {
          cloneRouters.push(...firstElement.children)
        }
      }
      return null
    },
    hasButtonPermission(needPermission: string[]): boolean {
      const userStore = useUserStore()
      return needPermission.includes(userStore.role)
    }
  }
}
