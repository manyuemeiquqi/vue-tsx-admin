import { Card, Grid } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import UserInfoHeader from '@/views/user/info/UserInfoHeader'
import InSiteNotifications from '@/views/user/info/InSiteNotifications'
import LatestActivities from '@/views/user/info/LatestActivities'
import MyTeam from '@/views/user/info/MyTeam'
import MyProject from '@/views/user/info/MyProject'
export default defineComponent({
  setup() {
    return () => (
      <div>
        <UserInfoHeader />
        <Grid.Row>
          <Grid.Col span={16}>
            <Card>
              <MyProject></MyProject>
            </Card>
          </Grid.Col>
          <Grid.Col span={8}>
            <MyTeam></MyTeam>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col span={16}>
            <LatestActivities />
          </Grid.Col>
          <Grid.Col span={8}>
            <InSiteNotifications />
          </Grid.Col>
        </Grid.Row>
      </div>
    )
  }
})
