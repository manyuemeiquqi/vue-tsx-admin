import { Affix } from '@arco-design/web-vue'
import { computed, defineComponent, onUnmounted, ref, watch } from 'vue'
import TabItem from './TabItem'
import useTabStore from '@/store/modules/tab/index'
import type { RouteLocationNormalized } from 'vue-router'
import { listenerRouteChange, removeRouteListener } from '@/utils/routerListener'

import styles from './style.module.scss'
import { layoutStyleConfig } from '@/types/constants'
export default defineComponent({
  name: 'TabBar',
  setup() {
    const tabStore = useTabStore()

    const tagList = computed(() => {
      return tabStore.getTabList
    })

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
      <div class={['relative', 'bg-[var(--color-bg-2)]']}>
        <Affix offsetTop={layoutStyleConfig.NAVBAR_HEIGHT}>
          <div class={[styles['tab-bar-box']]}>
            <div class={[styles['tab-bar-scroll']]}>
              <div class={[styles['tab-bar-wrap']]}>
                {tagList.value.map((item, index) => (
                  <TabItem itemData={item} index={index} />
                ))}
              </div>
            </div>
            <div class={['w-24', 'h-8']}></div>
          </div>
        </Affix>
      </div>
    )
  }
})
