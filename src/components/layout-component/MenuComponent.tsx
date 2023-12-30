import useAppRoute from '@/hooks/appRoute'
import { useAppStore } from '@/store'
import { listenerRouteChange } from '@/utils/routerListener'
import { Menu } from '@arco-design/web-vue'
import { defineComponent, h, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, type RouteRecordRaw } from 'vue-router'

export default defineComponent({
  name: 'MenuComponent',
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const { appRouteData } = useAppRoute()

    const appStore = useAppStore()
    const openKeys = ref<string[]>([])
    const selectedKey = ref<string[]>([])

    const renderMenuContent = () => {
      const traverse = (routeList: any[]) => {
        const list = []
        for (let i = 0; i < routeList.length; i++) {
          const route = routeList[i]
          if (route.children === undefined) {
            list.push(
              <Menu.Item key={route.name as string} onClick={() => handleMenuItemClick(route)}>
                {t(route.locale)}
              </Menu.Item>
            )
          } else {
            if (route.children.length > 0) {
              list.push(
                <Menu.SubMenu
                  key={route.name as string}
                  v-slots={{
                    icon: () => h(route.icon),
                    title: () => t(route.locale || '')
                  }}
                >
                  {traverse(route.children)}
                </Menu.SubMenu>
              )
            }
          }
        }
        return list
      }

      return traverse(appRouteData.value.tree)
    }

    const handleMenuItemClick = (item: RouteRecordRaw) => {
      router.push({
        name: item.name
      })
    }
    listenerRouteChange((newRoute) => {
      if (newRoute.name) {
        const appRoute = appRouteData.value.map[newRoute.name]
        if (appRoute) {
          const namePath = appRoute.namePath
          openKeys.value = Array.from(new Set([...namePath, ...openKeys.value]))
          const stackTopName = namePath[namePath.length - 1]
          selectedKey.value = [stackTopName]
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
