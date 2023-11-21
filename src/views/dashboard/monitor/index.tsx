import { Grid } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import ChatPanel from './ChatPanel'

export default defineComponent({
  setup() {
    return () => (
      <Grid.Row>
        <Grid.Col span={8}>
          <ChatPanel></ChatPanel>
        </Grid.Col>
        <Grid.Col span={8}></Grid.Col>
        <Grid.Col span={8}></Grid.Col>
      </Grid.Row>
    )
  }
})
