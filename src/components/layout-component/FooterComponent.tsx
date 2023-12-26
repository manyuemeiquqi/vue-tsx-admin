import { ApplicationInfo, layoutStyleConfig } from '@/types/constants'
import { LayoutFooter } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'FooterComponent',
  setup() {
    return () => (
      <LayoutFooter
        style={{
          height: layoutStyleConfig.footerHeight + 'px !important'
        }}
        class="flex justify-center items-center text-center text-[var(--color-text-2)]"
      >
        {ApplicationInfo.appTitle}
      </LayoutFooter>
    )
  }
})
