import { defineComponent } from 'vue'
import { Button, Card, Result } from '@arco-design/web-vue'

export default defineComponent({
  setup() {
    return () => (
      <Card class="content-wrapper">
        <Result status={'500'} subtitle="抱歉，服务器出了点问题～">
          {{
            extra: () => <Button type="primary">返回</Button>
          }}
        </Result>
      </Card>
    )
  }
})
