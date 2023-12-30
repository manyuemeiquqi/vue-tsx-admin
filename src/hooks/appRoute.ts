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
import { isString } from 'lodash'
import { computed } from 'vue'
import type { RouteRecordName, RouteRecordRaw } from 'vue-router'
import usePermission from './permission'

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

/**
 * @desc convention
 *  dashboard is fixed no permission view, if you want dynamic ,use following and complete other logic
 */
export const firstPermissionRoute = {
  name: ViewNames.workplace,
  title: 'menu.dashboard.workplace',
  fullPath: '/dashboard/workplace'
}
//  computed to memo
// const firstPermissionRoute = (() => {
//   const getFirstChild = (node: RouteRecordRaw): null | RouteRecordRaw => {
//     if (permission.checkRoutePermission(node)) {
//       if (node.children === undefined) {
//         return node
//       } else {
//         for (let i = 0; i < node.children.length; i++) {
//           const findRes = getFirstChild(node.children[i])
//           if (findRes) {
//             return findRes
//           }
//         }
//       }
//     }
//     return null
//   }
//   for (let i = 0; i < appRoutes.length; i++) {
//     const findRes = getFirstChild(appRoutes[i])
//     if (findRes) {
//       return findRes
//     }
//   }
//   return null
// })

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
    return { tree: nodeList, map: _map }
  })

  return {
    appRouteData
  }
}
