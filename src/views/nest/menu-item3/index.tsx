import { Button, Typography } from '@arco-design/web-vue'
import { KeepAlive, defineComponent, ref, h, type VNode } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

export default defineComponent({
  setup() {
    const count = ref<number>(0)
    return () => (
      <div>
        <Typography.Title heading={1}>menu item 3</Typography.Title>
        <div>
          <RouterLink
            to={{
              name: 'ITEM1'
            }}
          >
            ITEM1
          </RouterLink>
          <RouterLink
            to={{
              name: 'ITEM2'
            }}
          >
            ITEM2
          </RouterLink>
          {count.value}
          <Button onClick={() => count.value++}>+++</Button>
          <RouterView>
            {({ Component }: { Component: VNode }) => {
              console.log('Component: ', Component)
              return Component && <KeepAlive>{h(Component)}</KeepAlive>
            }}
          </RouterView>
        </div>
      </div>
    )
  }
})
