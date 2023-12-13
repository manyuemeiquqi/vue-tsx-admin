import { Card, Grid, Space } from '@arco-design/web-vue'
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
        <Grid.Row gutter={16}>
          <Grid.Col span={16}>
            <Space direction="vertical" fill size={'medium'}>
              <MyProject></MyProject>
              <LatestActivities />
            </Space>
          </Grid.Col>
          <Grid.Col span={8}>
            <Space direction="vertical" fill size={'medium'}>
              <MyTeam></MyTeam>
              <InSiteNotifications />
            </Space>
          </Grid.Col>
        </Grid.Row>
      </div>
    )
  }
})
