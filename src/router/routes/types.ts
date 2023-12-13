import { defineComponent } from 'vue'
import type { RouteMeta, NavigationGuard } from 'vue-router'

export interface AppRouteRecordRaw {
  path: string
  name?: string | symbol
  meta?: RouteMeta
  redirect?: string
  //component: Component | string
  children?: AppRouteRecordRaw[]
  alias?: string | string[]
  props?: Record<string, any>
  beforeEnter?: NavigationGuard | NavigationGuard[]
  fullPath?: string
}
