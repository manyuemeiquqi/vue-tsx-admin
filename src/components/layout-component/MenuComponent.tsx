import useMenuTree from '@/router/routes/useRoutes'
import { Button, Menu } from '@arco-design/web-vue'
import { computed, defineComponent, ref, type VNode } from 'vue'
import { get } from 'lodash'
import { useI18n } from 'vue-i18n'
import { useRouter, type RouteRecordRaw, type RouteMeta, useRoute } from 'vue-router'
import { AppRouteNames } from '@/types/constants'
import {
  IconCheckCircle,
  IconDashboard,
  IconExclamationCircle,
  IconFile,
  IconList,
  IconSettings,
  IconUser
} from '@arco-design/web-vue/es/icon'
import { useAppStore } from '@/store'
import { listenerRouteChange } from '@/utils/routerListener'
// import { openWindow, regexUrl } from '@/utils';
//menu 有三种形式
// 但是能够访问的形式只有一种 就只能放在 menu-item里面，其余的就是放在不同的父级里面
const sumMenuRenderMap: Record<AppRouteNames[number], VNode> = {
  [AppRouteNames.dashboard]: <IconDashboard />,
  [AppRouteNames.profile]: <IconFile />,
  [AppRouteNames.exception]: <IconExclamationCircle />,
  [AppRouteNames.form]: <IconSettings />,
  [AppRouteNames.list]: <IconList />,
  [AppRouteNames.result]: <IconCheckCircle />,
  [AppRouteNames.user]: <IconUser />
}
export default defineComponent({
  name: 'MenuComponent',
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const { menuTree } = useMenuTree()
    const applicationStore = useAppStore()
    const openKeys = ref<string[]>([])
    const selectedKey = ref<string[]>([])

    const renderMenuContent = () => {
      const dfs = (_route: any, nodes = []) => {
        if (_route) {
          for (let i = 0; i < _route.length; i++) {
            const curRoute = _route[i]
            let node
            const title = get(curRoute, 'meta.locale') || ''

            if (curRoute.children && curRoute.children.length) {
              node = (
                <Menu.SubMenu
                  key={curRoute.name}
                  v-slots={{
                    icon: () => sumMenuRenderMap[curRoute.name] || null,
                    title: () => t(title)
                  }}
                >
                  {dfs(curRoute.children)}
                </Menu.SubMenu>
              )
            } else {
              node = (
                <Menu.Item key={curRoute.name} onClick={() => handleMenuItemClick(curRoute)}>
                  {t(title)}
                </Menu.Item>
              )
            }

            nodes.push(node as never)
          }
        }
        return nodes
      }
      return dfs(menuTree.value)
    }

    const handleMenuItemClick = (item: RouteRecordRaw) => {
      router.push({
        name: item.name
      })
    }
    const findMenuOpenKeys = (target: string) => {
      const result: string[] = []
      let isFind = false
      const backtrack = (item: RouteRecordRaw, keys: string[]) => {
        if (item.name === target) {
          isFind = true
          result.push(...keys)
          return
        }
        if (item.children?.length) {
          item.children.forEach((el) => {
            backtrack(el, [...keys, el.name as string])
          })
        }
      }
      menuTree.value.forEach((el: RouteRecordRaw) => {
        if (isFind) return // Performance optimization
        backtrack(el, [el.name as string])
      })
      return result
    }
    listenerRouteChange((newRoute) => {
      const { requiresAuth, activeMenu, hideInMenu } = newRoute.meta
      if (requiresAuth && (!hideInMenu || activeMenu)) {
        const menuOpenKeys = findMenuOpenKeys((activeMenu || newRoute.name) as string)

        const keySet = new Set([...menuOpenKeys, ...openKeys.value])
        openKeys.value = [...keySet]

        selectedKey.value = [activeMenu || menuOpenKeys[menuOpenKeys.length - 1]]
      }
    }, true)

    return () => (
      <Menu
        v-model:collapsed={applicationStore.menuCollapse}
        v-model:open-keys={openKeys.value}
        selected-keys={selectedKey.value}
        mode="vertical"
        show-collapse-button
        auto-open={false}
        auto-open-selected={true}
        level-indent={34}
        class={['w-full', 'h-full']}
      >
        {renderMenuContent()}
      </Menu>
    )
  }
})
