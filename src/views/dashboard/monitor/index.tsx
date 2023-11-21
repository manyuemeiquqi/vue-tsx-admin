import { Grid } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import ChatPanel from './ChatPanel'
import LivePanel from './LivePanel'
import QuickOperation from './QuickOperation'
import LiveStatus from './LiveStatus'
import LiveInformation from './LiveInformation'

export default defineComponent({
  setup() {
    return () => (
      <Grid.Row>
        <Grid.Col span={8}>
          <ChatPanel></ChatPanel>
        </Grid.Col>
        <Grid.Col span={8}>
          <LivePanel />
        </Grid.Col>
        <Grid.Col span={8}>
          <LiveStatus />
          <QuickOperation />
          <LiveInformation />
        </Grid.Col>
      </Grid.Row>
    )
  }
})
