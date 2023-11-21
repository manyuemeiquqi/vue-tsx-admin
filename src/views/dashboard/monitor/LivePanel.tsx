import { RadioGroup, Table, Space, Tabs, Card, Avatar, Typography } from '@arco-design/web-vue'
import { IconMore } from '@arco-design/web-vue/es/icon'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    return () => (
      <Space>
        <div>
          <Card>
            {{
              default: () => (
                <div>
                  <img src="http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c788fc704d32cf3b1136c7d45afc2669.png~tplv-uwbnlip3yd-webp.webp" />
                  <Space>
                    <Avatar>
                      <img src="" alt="" />
                    </Avatar>
                    <Typography.Text></Typography.Text>
                  </Space>
                  <Typography.Text>36,000 {t('monitor.studioPreview.watching')}</Typography.Text>
                </div>
              ),
              extra: () => <IconMore />
            }}
          </Card>
        </div>
        <div>
          <Tabs></Tabs>
          <RadioGroup></RadioGroup>
          <Table></Table>
        </div>
      </Space>
    )
  }
})
