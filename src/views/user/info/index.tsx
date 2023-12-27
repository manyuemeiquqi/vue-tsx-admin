import { ViewNames } from '@/types/constants'
import InSiteNotifications from '@/views/user/info/InSiteNotifications'
import LatestActivities from '@/views/user/info/LatestActivities'
import MyProject from '@/views/user/info/MyProject'
import MyTeam from '@/views/user/info/MyTeam'
import UserInfoHeader from '@/views/user/info/UserInfoHeader'
import { Grid, Space } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: ViewNames.info,
  setup() {
    return () => (
      <div>
        <UserInfoHeader class="mb-4" />
        <Grid.Row gutter={16}>
          <Grid.Col span={16}>
            <Space direction="vertical" fill size={'medium'}>
              <MyProject></MyProject>
              <LatestActivities />
            </Space>
          </Grid.Col>
          <Grid.Col span={8}>
            <Space direction="vertical" fill size={'medium'}>
              <MyTeam />
              <InSiteNotifications />
            </Space>
          </Grid.Col>
        </Grid.Row>
      </div>
    )
  }
})
