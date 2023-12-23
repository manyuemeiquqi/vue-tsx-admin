import useTabStore from '@/store/modules/tab/index'
import { listenerRouteChange, removeRouteListener } from '@/utils/routerListener'
import { Affix } from '@arco-design/web-vue'
import { computed, defineComponent, onUnmounted } from 'vue'
import type { RouteLocationNormalized } from 'vue-router'
import TabItem from './TabItem'
import { layoutStyleConfig } from '@/types/constants'
import styles from './style.module.scss'

export default defineComponent({
  name: 'TabBar',
  setup() {
    const tabStore = useTabStore()

    const tagList = computed(() => {
      return tabStore.getTabList
    })
    console.log(tagList.value)

    // watch(
    //   () => appStore.navbar,
    //   () => {
    //     affixRef.value.updatePosition()
    //   }
    // )
    listenerRouteChange((route: RouteLocationNormalized) => {
      if (!route.meta.noAffix && !tagList.value.some((tag) => tag.fullPath === route.fullPath)) {
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
              {tagList.value.map((item, index) => (
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
