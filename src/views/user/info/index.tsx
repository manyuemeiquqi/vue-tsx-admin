import { Grid } from '@arco-design/web-vue'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return (
      <div>
        {'head'}
        <Grid>
          <Grid.Item></Grid.Item>
        </Grid>
      </div>
    )
  }
})
