import useMenuTree from '@/router/routes/useRoutes'
import { Menu } from '@arco-design/web-vue'
import { defineComponent, h, compile } from 'vue'
import { get } from 'lodash'
//menu 有三种形式
// 但是能够访问的形式只有一种 就只能放在 menu-item里面，其余的就是放在不同的父级里面

export default defineComponent({
  setup() {
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
            const title = `get(curRoute, 'meta.local')`
            let node
            if (curRoute.children && curRoute.children.length) {
              // node =
              node = (
                <Menu.SubMenu
                  v-slots={{
                    icon,
                    title: () => `get(curRoute, 'meta.local')` || ''
                  }}
                >
                  {dfs(curRoute.children)}
                </Menu.SubMenu>
              )
            } else {
              node = (
                <Menu.Item
                  v-slots={{
                    icon
                  }}
                >
                  {title}
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
