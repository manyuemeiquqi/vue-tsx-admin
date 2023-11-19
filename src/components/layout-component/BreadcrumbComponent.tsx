import { Breadcrumb } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    const breadData: any[] = []
    return () => (
      <Breadcrumb>
        {breadData.map((item) => (
          <Breadcrumb.Item></Breadcrumb.Item>
        ))}
      </Breadcrumb>
    )
  }
})
