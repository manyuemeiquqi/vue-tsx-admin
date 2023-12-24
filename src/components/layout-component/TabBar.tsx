import useTabStore from '@/store/modules/tab/index'
import { layoutStyleConfig } from '@/types/constants'
import { listenerRouteChange, removeRouteListener } from '@/utils/routerListener'
import { Affix } from '@arco-design/web-vue'
import { computed, defineComponent, onUnmounted } from 'vue'
import type { RouteLocationNormalized } from 'vue-router'
import TabItem from './TabItem'

export default defineComponent({
  name: 'TabBar',
  setup() {
    const tabStore = useTabStore()
    const tabList = computed(() => {
      return tabStore.getTabList
    })

    listenerRouteChange((route: RouteLocationNormalized) => {
      if (!route.meta.noAffix && !tabList.value.some((item) => item.name === route.name)) {
        tabStore.updateTabList(route)
      }
    }, true)
    onUnmounted(() => {
      removeRouteListener()
    })
    return () => (
      <Affix offsetTop={layoutStyleConfig.NAVBAR_HEIGHT}>
        <div
          style={{
            borderBottom: '1px solid var(--color-border)'
          }}
          class={['flex', 'bg-[var(--color-bg-2)]', 'px-4']}
        >
          <div class={['overflow-hidden', 'flex-1']}>
            <div class={['whitespace-nowrap', 'overflow-x-auto', 'px-0', 'py-1']}>
              {tabList.value.map((item, index) => (
                <TabItem itemData={item} index={index} />
              ))}
            </div>
          </div>
          <div class={['w-24', 'h-8']}></div>
        </div>
      </Affix>
    )
  }
})
