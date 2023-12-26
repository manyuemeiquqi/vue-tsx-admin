import { useAppStore } from '@/store'
import { layoutStyleConfig } from '@/types/constants'
import { computed, defineComponent, type VNode } from 'vue'
type Slots = {
  default: () => VNode
}
export default defineComponent({
  name: 'CardLayout',
  setup(_, { slots }) {
    const appStore = useAppStore()
    const height = computed(() => {
      let ret =
        layoutStyleConfig.breadcrumbHeight +
        layoutStyleConfig.footerHeight +
        layoutStyleConfig.tabHeight
      if (appStore.navbar) {
        ret += layoutStyleConfig.navbarHeight
      }
      return ret
    })
    return () => (
      <div
        class="content-wrapper"
        style={{
          minHeight: `calc(100vh - ${height.value}px)`
        }}
      >
        {(slots as unknown as Slots).default()}
      </div>
    )
  }
})
