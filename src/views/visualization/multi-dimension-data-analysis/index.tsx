import { Grid, Space } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import DataOverview from '@/views/visualization/multi-dimension-data-analysis/DataOverview'
export default defineComponent({
  setup() {
    return () => (
      <Space>
        <Grid.Row>
          <Grid.Col>
            <DataOverview />
          </Grid.Col>
          <Grid.Col></Grid.Col>
        </Grid.Row>
        <Grid.Row></Grid.Row>
        <Grid.Row></Grid.Row>
      </Space>
    )
  }
})
