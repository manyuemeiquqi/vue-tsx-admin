import { useUserStore } from '@/store'
import { cloneDeep, get } from 'lodash'
import { type AppRouteRecordRaw } from '@/router/routes/types'

export default function usePermission() {
  const userStore = useUserStore()
  return {
    hasPermission(route: AppRouteRecordRaw) {
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
    findFirstPermissionRoute(_routes: any) {
      const cloneRouters = cloneDeep(_routes)
      while (cloneRouters.length) {
        const firstElement = cloneRouters.shift()
        if (
          // firstElement?.meta?.roles?.find((el: string[]) => {
          //   return el.includes('*') || el.includes(role);
          // })
          this.hasPermission(firstElement)
        )
          return { name: firstElement.name }
        if (firstElement?.children) {
          cloneRouters.push(...firstElement.children)
        }
      }
      return null
    }
  }
}
