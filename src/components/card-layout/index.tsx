import { useAppStore } from '@/store'
import { layoutStyleConfig } from '@/types/constants'
import { computed, defineComponent, type VNode } from 'vue'
interface Slots {
  default: () => VNode
}
export default defineComponent({
  name: 'CardLayout',
  setup(_, { slots }) {
    const applicationStore = useAppStore()
    const height = computed(() => {
      let ret =
        layoutStyleConfig.BREAD_HEIGHT +
        layoutStyleConfig.FOOTER_HEIGHT +
        layoutStyleConfig.TAB_HEIGHT
      if (applicationStore.navbar) {
        ret += layoutStyleConfig.NAVBAR_HEIGHT
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
