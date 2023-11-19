import { Card, Result } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    return () => (
      <Card>
        <Result subtitle="" status="404"></Result>
      </Card>
    )
  }
})
