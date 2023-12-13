import { Avatar, Grid, Typography } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    return () => (
      <Grid.Row>
        <Grid.Col span={8}></Grid.Col>
      </Grid.Row>
    )
  }
})
