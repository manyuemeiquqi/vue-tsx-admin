import { appRoutes } from '@/router/routes'
import { cloneDeep } from 'lodash'
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

export type AppRoute = {
  icon?: typeof IconDashboard
  routeNamePath?: string[]
  localePath?: string[]
  [key: string]: any
} & RouteRecordRaw

type Context = {
  currentNode: AppRoute | null
  childIndex: number
  parent: AppRoute | null
  transformPlugins: ((node: AppRoute, context: Context) => void)[]
  removeNode: (context: Context) => void
  setNodeProperty: (context: Context, attrName: string, value: unknown) => void
}
const routeIconMap: Record<RouteRecordName, typeof IconDashboard> = {
  [ViewNames.dashboard]: IconDashboard,
  [ViewNames.profile]: IconFile,
  [ViewNames.exception]: IconExclamationCircle,
  [ViewNames.form]: IconSettings,
  [ViewNames.list]: IconList,
  [ViewNames.result]: IconCloseCircle,
  [ViewNames.user]: IconUser
}

type AppRouteMap = Record<RouteRecordName, AppRoute>
export default function useAppRoute() {
  const permission = usePermission()
  const transformedRoutes = computed(() => {
    const appRouteMap: AppRouteMap = {}
    const copyRoutes = cloneDeep(appRoutes)
    transform(copyRoutes, appRouteMap)
    return { tree: copyRoutes, map: appRouteMap }
  })
  function transform(nodeList: AppRoute[], _map: AppRouteMap) {
    function traverseNode(node: AppRoute, context: Context) {
      context.currentNode = node
      const transforms = context.transformPlugins
      for (let i = 0; i < transforms.length; i++) {
        transforms[i](context.currentNode, context)
        if (!context.currentNode) return
      }
      const children = node.children
      if (children) {
        context.parent = context.currentNode
        for (let j = 0; j < children.length; j++) {
          context.childIndex = j
          traverseNode(children[j], context)
        }
      }
    }

    const checkPermission = (node: AppRoute, context: Context) => {
      if (!permission.checkRoutePermission(node)) {
        context.removeNode(context)
      }
    }
    const setRouteIcon = (node: AppRoute, context: Context) => {
      if (node.name) {
        const icon = routeIconMap[node.name as ViewNames]
        if (icon) context.setNodeProperty(context, 'icon', icon)
      }
    }
    const setRouteLocalePath = (node: AppRoute, context: Context) => {
      const parentLocalePath = context.parent ? context.parent?.localePath || [] : []
      context.setNodeProperty(context, 'localePath', [
        ...[...parentLocalePath],
        node.meta?.locale || ''
      ])
    }
    const setRouteRouteNamePath = (node: AppRoute, context: Context) => {
      const parentRouteNamePath = context.parent ? context.parent?.routeNamePath || [] : []

      context.setNodeProperty(context, 'routeNamePath', [
        ...[...parentRouteNamePath],
        node.name || ''
      ])
    }
    const assignRouteMap = (node: AppRoute, context: Context) => {
      const routeName = node?.name
      if (node && routeName) {
        _map[routeName] = node
      }
    }

    for (let k = 0; k < nodeList.length; k++) {
      const context: Context = {
        currentNode: null,
        childIndex: 0,
        parent: null,
        transformPlugins: [
          checkPermission,
          setRouteIcon,
          setRouteLocalePath,
          setRouteRouteNamePath,
          assignRouteMap
        ],
        removeNode(context: Context) {
          if (context.parent && context.parent.children) {
            context.parent.children.splice(context.childIndex, 1)
            context.currentNode = null
          }
        },
        setNodeProperty(context: Context, attrName: string, value: unknown) {
          if (context.currentNode) {
            context.currentNode[attrName] = value
          }
        }
      }

      traverseNode(nodeList[k], context)
    }
  }
  return {
    transformedRoutes
  }
}
