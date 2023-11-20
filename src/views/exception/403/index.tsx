import { defineComponent } from 'vue'
import { Button, Card, Result } from '@arco-design/web-vue'

export default defineComponent({
  setup() {
    return () => (
      <Card class="content-wrapper">
        <Result status={'403'} subtitle="对不起，您没有访问该资源的权限">
          {{
            extra: () => <Button type="primary">返回</Button>
          }}
        </Result>
      </Card>
    )
  }
})
