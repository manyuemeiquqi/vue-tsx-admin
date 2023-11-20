import { Grid, Tabs } from '@arco-design/web-vue'
import { defineComponent, h } from 'vue'
import UserPanel from './UserPanel'
import Certification from './Certification'
import SecuritySettings from './SecuritySettings'
import BasicInformation from './BasicInformation'
export default defineComponent({
  setup() {
    const componentList = [
      {
        key: '1',
        component: BasicInformation,
        title: '基础信息'
      },
      {
        key: '2',
        component: SecuritySettings,
        title: '安全设置'
      },
      {
        key: '3',
        component: Certification,
        title: '实名认证'
      }
    ]
    return () => (
      <div>
        <Grid.Row>
          <Grid.Col span={24}>
            <UserPanel></UserPanel>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col span={24}>
            <Tabs defaultActiveKey={'1'}>
              {componentList.map((item) => {
                return (
                  <Tabs.TabPane key={item.key} title={item.title}>
                    {h(item.component)}
                  </Tabs.TabPane>
                )
              })}
            </Tabs>
          </Grid.Col>
        </Grid.Row>
      </div>
    )
  }
})
