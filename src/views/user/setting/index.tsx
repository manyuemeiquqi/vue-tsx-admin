import { Card, Grid, Tabs } from '@arco-design/web-vue'
import { defineComponent, h } from 'vue'
import UserPanel from './UserPanel'
import Certification from './Certification'
import SecuritySettings from './SecuritySettings'
import BasicInformation from './BasicInformation'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  setup() {
    const { t } = useI18n()
    const componentList = [
      {
        key: '1',
        component: BasicInformation,
        title: t('userSetting.tab.basicInformation')
      },
      {
        key: '2',
        component: SecuritySettings,
        title: t('userSetting.tab.securitySettings')
      },
      {
        key: '3',
        component: Certification,
        title: t('userSetting.tab.certification')
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
          <Grid.Col span={24} class="mt-4">
            <Card class="general-card pt-5">
              <Tabs type="rounded" defaultActiveKey={'1'}>
                {componentList.map((item) => {
                  return (
                    <Tabs.TabPane key={item.key} title={item.title}>
                      {h(item.component)}
                    </Tabs.TabPane>
                  )
                })}
              </Tabs>
            </Card>
          </Grid.Col>
        </Grid.Row>
      </div>
    )
  }
})
