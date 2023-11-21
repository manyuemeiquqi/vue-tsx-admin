import { Card, Grid } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import ContentPublishSource from './ContentPublishSource'
import CardList from './CardList'
import DataOverview from './DataOverview'
import RightTowChart from './RightTowChart'

export default defineComponent({
  setup() {
    return () => (
      <div>
        <Grid.Row>
          <Grid.Col span={20}>
            <DataOverview />
          </Grid.Col>
          <Grid.Col span={4}>
            <RightTowChart />
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <CardList />
        </Grid.Row>
        <Grid.Row>
          <ContentPublishSource />
        </Grid.Row>
      </div>
    )
  }
})
