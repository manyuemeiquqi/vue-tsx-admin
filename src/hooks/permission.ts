import { useUserStore } from '@/store'
import { cloneDeep, get } from 'lodash'
import type { RouteRecordRaw } from 'vue-router'

export default function usePermission() {
  const userStore = useUserStore()
  return {
    checkRoutePermission(route: RouteRecordRaw) {
      const requiresAuth = get(route, 'meta.requiresAuth')
      const needRoles = (get(route, 'meta.roles') || []) as string[]
      return (
        !requiresAuth ||
        needRoles.length === 0 ||
        needRoles.includes('*') ||
        needRoles.includes(userStore.userInfo.role)
      )
    },

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

    checkButtonPermission(needPermission: string[]): boolean {
      const userStore = useUserStore()
      return needPermission.includes(userStore.role)
    }
  }
}
