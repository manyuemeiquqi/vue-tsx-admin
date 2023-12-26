import useTabStore from '@/store/modules/tab/index'
import { layoutStyleConfig } from '@/types/constants'
import { listenerRouteChange, removeRouteListener } from '@/utils/routerListener'
import { Affix } from '@arco-design/web-vue'
import { computed, defineComponent, onUnmounted, ref, watch } from 'vue'
import type { RouteLocationNormalized } from 'vue-router'
import TabItem from './TabItem'
import styles from './style.module.scss'
import { useAppStore } from '@/store'
export default defineComponent({
  name: 'TabBar',
  setup() {
    const tabStore = useTabStore()
    const tabList = computed(() => {
      return tabStore.tabList
    })
    const affixRef = ref()
    listenerRouteChange((route: RouteLocationNormalized) => {
      if (!tabList.value.some((item) => item.name === route.name)) {
        tabStore.updateTabList(route)
      }
    }, true)
    onUnmounted(() => {
      removeRouteListener()
    })
    const appStore = useAppStore()
    const offsetTop = computed(() => {
      return appStore.navbar ? layoutStyleConfig.navbarHeight : 0
    })
    watch(
      () => appStore.navbar,
      () => {
        affixRef.value.updatePosition()
      }
    )
    return () => (
      <Affix ref={affixRef} offsetTop={offsetTop.value}>
        <div
          class={[styles['tab-box']]}
          style={{
            height: layoutStyleConfig.tabHeight
          }}
        >
          <div class={['overflow-hidden', 'flex-1']}>
            <div class={['whitespace-nowrap', 'overflow-x-auto', 'px-0', 'py-1']}>
              {tabList.value.map((item, index) => (
                <TabItem itemData={item} index={index} key={index} />
              ))}
            </div>
          </div>
          <div class={['w-24', 'h-8']}></div>
        </div>
      </Affix>
    )
  }
})
