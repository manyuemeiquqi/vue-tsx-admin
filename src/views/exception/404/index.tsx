import { Card, Button, Result, Space } from '@arco-design/web-vue'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return () => (
      <Card class="content-wrapper">
        <Result status={'404'} subtitle="抱歉，页面不见了～">
          {{
            extra: () => (
              <Space>
                <Button>重试</Button>
                <Button type="primary">返回</Button>
              </Space>
            )
          }}
        </Result>
      </Card>
    )
  }
})
