import { appRoutes } from '@/router/routes'
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
import { computed } from 'vue'
import type { RouteRecordName, RouteRecordRaw } from 'vue-router'
import usePermission from './permission'
import { isNull, isString } from 'lodash'

const routeIconMap: Record<RouteRecordName, typeof IconDashboard | undefined> = {
  [ViewNames.dashboard]: IconDashboard,
  [ViewNames.profile]: IconFile,
  [ViewNames.exception]: IconExclamationCircle,
  [ViewNames.form]: IconSettings,
  [ViewNames.list]: IconList,
  [ViewNames.result]: IconCloseCircle,
  [ViewNames.user]: IconUser
}

type Context = {
  currentNode: MenuData | null
  parent: MenuData | null
}

type MenuData = {
  name: string
  icon?: typeof IconDashboard
  namePath: string[]
  locale: string
  localePath: string[]
  children?: MenuData[]
}
type TreeInfo = {
  leftFirstLeaf: MenuData | null
}
export default function useAppRoute() {
  const permission = usePermission()
  const appRouteData = computed(() => {
    const getMenuData = (route: RouteRecordRaw, context: Context) => {
      const ret: MenuData = {
        name: isString(route.name) ? route.name : '',
        locale: typeof route.meta?.locale === 'string' ? route.meta.locale : '',
        localePath: [],
        namePath: []
      }
      ret.namePath.push(ret.name)
      ret.localePath.push(ret.locale)
      if (context.parent?.localePath) {
        ret.localePath = context.parent.localePath.concat(ret.localePath)
      }
      if (context.parent?.namePath) {
        ret.namePath = context.parent.namePath.concat(ret.namePath)
      }
      if (ret.name in routeIconMap) {
        ret.icon = routeIconMap[ret.name]
      }
      return ret
    }

    const getSubMenu = (node: RouteRecordRaw, context: Context) => {
      if (permission.checkRoutePermission(node)) {
        const menuData = getMenuData(node, context)
        context.currentNode = menuData
        if (node.children === undefined) {
          _map[menuData.name] = menuData
          if (isNull(treeInfo.leftFirstLeaf)) {
            treeInfo.leftFirstLeaf = menuData
          }
          return menuData
        } else {
          const list: MenuData[] = []
          for (let j = 0; j < node.children.length; j++) {
            context.parent = menuData
            const child = getSubMenu(node.children[j], context)
            if (child) list.push(child)
          }
          if (list.length) {
            menuData.children = list
            _map[menuData.name] = menuData
            return menuData
          }
          return null
        }
      } else {
        return null
      }
    }
    const _map: Record<RouteRecordName, MenuData | undefined> = {}
    const nodeList = []
    const treeInfo: TreeInfo = {
      leftFirstLeaf: null
    }
    for (let i = 0; i < appRoutes.length; i++) {
      const context: Context = {
        currentNode: null,
        parent: null
      }
      const menuNode = getSubMenu(appRoutes[i], context)
      if (menuNode) {
        nodeList.push(menuNode)
      }
    }
    return { tree: nodeList, map: _map, treeInfo }
  })
  return {
    appRouteData
  }
}
