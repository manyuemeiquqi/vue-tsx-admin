import { appRoutes } from '@/router/routes'
import { cloneDeep, isString } from 'lodash'
import type { RouteRecordName, RouteRecordRaw } from 'vue-router'
import usePermission from './permission'
import { computed } from 'vue'
import { ViewNames } from '@/types/constants'
import {
  IconCloseCircle,
  IconDashboard,
  IconExclamationCircle,
  IconFile,
  IconList,
  IconSettings,
  IconUser
} from '@arco-design/web-vue/es/icon'

const routeIconMap: Record<RouteRecordName, typeof IconDashboard> = {
  [ViewNames.dashboard]: IconDashboard,
  [ViewNames.profile]: IconFile,
  [ViewNames.exception]: IconExclamationCircle,
  [ViewNames.form]: IconSettings,
  [ViewNames.list]: IconList,
  [ViewNames.result]: IconCloseCircle,
  [ViewNames.user]: IconUser
}

type Context = {
  currentNode: AppRouteInfo | null
  parent: AppRouteInfo | null
}
type AppRouteInfo = {
  name: string
  icon?: typeof IconDashboard
  namePath: string[]
  localePath: string[]
  children?: AppRouteInfo[]
}
export default function useAppRoute() {
  const permission = usePermission()
  const appRouteTree = computed(() => {
    const appRouteMap: Record<string, AppRouteInfo> = {}
    const menuTree = []

    const generateRenderNode = (route: RouteRecordRaw, context: Context) => {
      const ret: AppRouteInfo = {
        name: '',
        namePath: [],
        localePath: []
      }
      if (route.name && isString(route.name)) {
        if (route.name in ViewNames) {
          ret.name = route.name
          ret.namePath.push(route.name)
          ret.icon = routeIconMap[route.name]
        }
      }
      if (isString(route.meta?.locale)) {
        ret.localePath.push(route.meta.locale)
      }
      if (context.parent?.localePath) {
        ret.localePath = context.parent.localePath.concat(ret.localePath)
      }
      if (context.parent?.namePath) {
        ret.namePath = context.parent.localePath.concat(ret.namePath)
      }
      return ret
    }
    function getMenuNode(node: RouteRecordRaw, context: Context) {
      if (permission.checkRoutePermission(node)) {
        const renderData = generateRenderNode(node, context)
        context.currentNode = renderData
        if (node.children === undefined) {
          appRouteMap[renderData.name] = renderData
          return renderData
        } else {
          const list: AppRouteInfo[] = []
          for (let j = 0; j < node.children.length; j++) {
            context.parent = renderData
            const child = getMenuNode(node, context)
            if (child) list.push(child)
          }
          list.filter(Boolean)
          if (list.length) {
            renderData.children = list
            appRouteMap[renderData.name] = renderData
            return renderData
          }
          return null
        }
      } else {
        return null
      }
    }
    for (let i = 0; i < appRoutes.length; i++) {
      const context: Context = {
        currentNode: null,
        parent: null
      }
      const menuChild = getMenuNode(appRoutes[i], context)
      if (menuChild) {
        menuTree.push(menuChild)
      }
    }
    return { tree: menuTree, map: appRouteMap }
  })

  return {
    transformedRoutes
  }
}
