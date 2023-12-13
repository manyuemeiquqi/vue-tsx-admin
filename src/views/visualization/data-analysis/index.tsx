import { Grid, Space } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import ContentPeriodAnalysis from './ContentPeriodAnalysis'
import ContentPublishRatio from './ContentPublishRatio'
import PopularTable from './PopularTable'
import PublicOpinionAnalysis from './PublicOpinionAnalysis'
export default defineComponent({
  setup() {
    return () => (
      <Space direction="vertical" fill size="medium">
        <PublicOpinionAnalysis />
        <Grid.Row gutter={16}>
          <Grid.Col span={12}>
            <ContentPublishRatio />
          </Grid.Col>
          <Grid.Col span={12}>
            <PopularTable />
          </Grid.Col>
        </Grid.Row>
        <ContentPeriodAnalysis />
      </Space>
    )
  }
})
