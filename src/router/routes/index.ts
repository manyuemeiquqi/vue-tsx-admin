// https://vitejs.dev/guide/features.html#glob-import

import { get } from 'lodash'
import type { RouteRecordRaw } from 'vue-router'

const innerModules = import.meta.glob('./modules/*.ts', { eager: true })
const getRoutesFromModules = (_moduleMap: Record<string, unknown>) => {
  const ret: RouteRecordRaw[] = []
  for (const key in _moduleMap) {
    const exportContent = get(_moduleMap[key], 'default')
    if (exportContent) {
      ret.push(...[exportContent])
    }
  }
  return ret
}
export const appRoutes: RouteRecordRaw[] = getRoutesFromModules(innerModules)
