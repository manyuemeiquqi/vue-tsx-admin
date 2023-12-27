import { Grid, Space } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import ChatPanel from './ChatPanel'
import LiveInformation from './LiveInformation'
import LivePanel from './LivePanel'
import LiveStatus from './LiveStatus'
import QuickOperation from './QuickOperation'
import { ViewNames } from '@/types/constants'

export default defineComponent({
  name: ViewNames.monitor,
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
