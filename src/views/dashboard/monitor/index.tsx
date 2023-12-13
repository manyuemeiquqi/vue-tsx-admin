import { Grid, Space } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import ChatPanel from './ChatPanel'
import LivePanel from './LivePanel'
import QuickOperation from './QuickOperation'
import LiveStatus from './LiveStatus'
import LiveInformation from './LiveInformation'

export default defineComponent({
  setup() {
    return () => (
      <Grid.Row gutter={16}>
        <Grid.Col flex="300px">
          <ChatPanel></ChatPanel>
        </Grid.Col>
        <Grid.Col flex={1}>
          <LivePanel />
        </Grid.Col>
        <Grid.Col flex="280px">
          <Space fill direction="vertical" size="medium">
            <LiveStatus />
            <QuickOperation />
            <LiveInformation />
          </Space>
        </Grid.Col>
      </Grid.Row>
    )
  }
})
