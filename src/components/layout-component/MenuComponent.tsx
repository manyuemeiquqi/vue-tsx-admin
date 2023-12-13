import useMenuTree from '@/router/routes/useRoutes'
import { Menu } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import { get } from 'lodash'
import { useI18n } from 'vue-i18n'
import { useRouter, type RouteRecordRaw } from 'vue-router'
//menu 有三种形式
// 但是能够访问的形式只有一种 就只能放在 menu-item里面，其余的就是放在不同的父级里面

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const { menuTree } = useMenuTree()
    const renderMenuContent = () => {
      const dfs = (_route: any, nodes = []) => {
        if (_route) {
          for (let i = 0; i < _route.length; i++) {
            const curRoute = _route[i]
            // const icon = get(curRoute, 'meta.icon')
            //   ? () => h(compile(get(curRoute, 'meta.local')))
            //   : null
            const icon = null
            const title = get(curRoute, 'meta.locale') || ''
            let node
            if (curRoute.children && curRoute.children.length) {
              // node =
              node = (
                <Menu.SubMenu
                  v-slots={{
                    icon,
                    title: () => t(get(curRoute, 'meta.locale') || '')
                  }}
                >
                  {dfs(curRoute.children)}
                </Menu.SubMenu>
              )
            } else {
              node = (
                <Menu.Item
                  onClick={() => handleMenuItemClick(curRoute)}
                  v-slots={{
                    icon
                  }}
                >
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
      console.log('item: ', item)
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
        mode={'vertical'}
        show-collapse-button
        auto-open={false}
        auto-open-selected={true}
        level-indent={34}
        style="height: 100%;width:100%;"
      >
        {renderMenuContent()}
      </Menu>
    )
  }
})
