import { Typography } from '@arco-design/web-vue'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return () => (
      <div>
        <Typography.Title heading={1}>menu item 1</Typography.Title>
      </div>
    )
  }
})
