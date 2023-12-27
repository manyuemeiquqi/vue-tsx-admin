import { Menu } from '@arco-design/web-vue'
import { get } from 'lodash'
import { defineComponent, h, ref, toRaw } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter, type RouteRecordRaw } from 'vue-router'
import useAppRoute from '@/hooks/appRoute'
import { useAppStore } from '@/store'
import { listenerRouteChange } from '@/utils/routerListener'

export default defineComponent({
  name: 'MenuComponent',
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const { appRouteTree } = useAppRoute()

    const appStore = useAppStore()
    const openKeys = ref<string[]>([])
    const selectedKey = ref<string[]>([])
    if (route.name) {
    }
    const renderMenuContent = () => {
      const dfs = (_route: any, nodes = []) => {
        if (_route) {
          for (let i = 0; i < _route.length; i++) {
            const curRoute = _route[i]
            let node
            const title = get(curRoute, 'meta.locale') || ''
            // if (curRoute.icon as any) {
            //   curRoute.icon().then((res) => {
            //     console.log('res: ', res)
            //   })
            //   icon = await curRoute.icon()
            // }
            if (curRoute.children && curRoute.children.length) {
              node = (
                <Menu.SubMenu
                  key={curRoute.name}
                  v-slots={{
                    icon: () => h(curRoute.icon),
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
      return dfs(appRouteTree.value.tree)
    }

    const handleMenuItemClick = (item: RouteRecordRaw) => {
      router.push({
        name: item.name
      })
    }
    listenerRouteChange((newRoute) => {
      if (newRoute.name) {
        const routeNamePath = appRouteTree.value.map[newRoute.name].routeNamePath
        if (Array.isArray(routeNamePath)) {
          openKeys.value = routeNamePath
          const stackTopName = routeNamePath[routeNamePath.length - 1]
          if (stackTopName) selectedKey.value = [stackTopName]
        }
      }
    }, true)

    return () => (
      <Menu
        v-model:collapsed={appStore.menuCollapse}
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
