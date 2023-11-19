import { Card, Grid, Link } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    return () => (
      <Card title="">
        {{
          extra: () => <Link></Link>,
          default: () => <Grid.Row></Grid.Row>
        }}
      </Card>
    )
  }
})
