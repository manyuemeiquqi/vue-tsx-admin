import { Card, Grid, Space } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import ContentPublishSource from './ContentPublishSource'
import CardList from './CardList'
import DataOverview from './DataOverview'
import RightTowChart from './RightTowChart'

export default defineComponent({
  setup() {
    return () => (
      <Space direction="vertical" size="medium" fill>
        <Grid.Row gutter={16}>
          <Grid.Col span={18}>
            <DataOverview />
          </Grid.Col>
          <Grid.Col span={6}>
            <RightTowChart />
          </Grid.Col>
        </Grid.Row>
        <CardList />
        <ContentPublishSource />
      </Space>
    )
  }
})
