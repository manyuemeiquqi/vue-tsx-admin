// https://vitejs.dev/guide/features.html#glob-import

import { get } from 'lodash'
import type { RouteRecordNormalized } from 'vue-router'

const innerModules = import.meta.glob('./modules/*.ts', { eager: true })
const getRoutesFromModules = (_moduleMap: Record<string, unknown>) => {
  const ret: RouteRecordNormalized[] = []
  for (const key in _moduleMap) {
    let exportContent: RouteRecordNormalized[] | undefined | RouteRecordNormalized = get(
      _moduleMap[key],
      'default'
    )
    if (exportContent) {
      exportContent = Array.isArray(exportContent) ? exportContent : [exportContent]
      ret.push(...exportContent)
    }
  }
  return ret
}
export const appRoutes: RouteRecordNormalized[] = getRoutesFromModules(innerModules)
export const externalRoutes = [
  {
    path: 'https://arco.design',
    name: 'arcoWebsite',
    meta: {
      locale: 'menu.arcoWebsite',
      icon: 'icon-link',
      requiresAuth: true,
      order: 8
    }
  },
  {
    path: 'https://arco.design/vue/docs/pro/faq',
    name: 'faq',
    meta: {
      locale: 'menu.faq',
      icon: 'icon-question-circle',
      requiresAuth: true,
      order: 9
    }
  }
] as unknown as RouteRecordNormalized[]
