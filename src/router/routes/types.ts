import { defineComponent, type VNode } from 'vue'
import type { RouteMeta, NavigationGuard } from 'vue-router'

export type Component<T = VNode> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.tsx')>)
  | (() => Promise<T>)

export interface AppRouteRecordRaw {
  path: string
  name?: string | symbol
  meta?: RouteMeta
  redirect?: string
  component: VNode | Component
  children?: AppRouteRecordRaw[]
  alias?: string | string[]
  props?: Record<string, any>
  beforeEnter?: NavigationGuard | NavigationGuard[]
  fullPath?: string
}
