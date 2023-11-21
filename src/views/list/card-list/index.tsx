import { Card, Input, Tabs, Typography } from '@arco-design/web-vue'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const tabList = [{ title: '全部' }]
    const activeKey = ''
    const setActiveKey = () => {}
    const list: any = []
    return () => (
      <Card>
        <Typography.Title heading={6}>卡片列表</Typography.Title>
        <Tabs
          type="rounded"
          onChange={setActiveKey}
          activeKey={activeKey}
          v-slots={{
            extra: () => <Input placeholder="121" class="w-60" />
          }}
        >
          {tabList.map((tab) => (
            <Tabs.TabPane key={tab.title} title={tab.title}></Tabs.TabPane>
          ))}
        </Tabs>
        <div>
          {list.map((item: any) => (
            <div>
              <Typography.Title></Typography.Title>
            </div>
          ))}
        </div>
      </Card>
    )
  }
})
