import useMenuTree from '@/router/routes/useRoutes'
import { Button, Menu } from '@arco-design/web-vue'
import { defineComponent, type VNode } from 'vue'
import { get } from 'lodash'
import { useI18n } from 'vue-i18n'
import { useRouter, type RouteRecordRaw } from 'vue-router'
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
import { useApplicationStore } from '@/store'
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
    const { menuTree } = useMenuTree()
    const applicationStore = useApplicationStore()
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
                  v-slots={{
                    icon: () => sumMenuRenderMap[curRoute.name] || null,
                    title: () => t(title)
                  }}
                >
                  {dfs(curRoute.children)}
                </Menu.SubMenu>
              )
            } else {
              node = <Menu.Item onClick={() => handleMenuItemClick(curRoute)}>{t(title)}</Menu.Item>
            }

            nodes.push(node as never)
          }
        }
        return nodes
      }
      return dfs(menuTree.value)
    }

    const handleMenuItemClick = (item: RouteRecordRaw) => {
      // Open external link
      // if (regexUrl.test(item.path)) {
      //   openWindow(item.path)
      //   selectedKey.value = [item.name as string]
      //   return
      // }
      // // Eliminate external link side effects
      // const { hideInMenu, activeMenu } = item.meta as RouteMeta
      // if (route.name === item.name && !hideInMenu && !activeMenu) {
      //   selectedKey.value = [item.name as string]
      //   return
      // }
      // Trigger router change
      router.push({
        name: item.name
      })
    }
    return () => (
      <Menu
        v-model:collapsed={applicationStore.menuCollapse}
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
