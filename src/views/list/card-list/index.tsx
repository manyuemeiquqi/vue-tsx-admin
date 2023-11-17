import { Card, Input, InputSearch, Tabs, Typography } from '@arco-design/web-vue'
import { defineComponent } from 'vue'

{
  /* activeTab={activeKey}
        type="rounded"
        onChange={setActiveKey}
        extra={
          <Input.Search
            style={{ width: '240px' }}
            placeholder={t(`cardList.tab.${activeKey}.placeholder`)}
          />
        }
      > */
}

export default defineComponent({
  setup() {
    const tabList = [{ title: '全部' }]
    const activeKey = ''
    const setActiveKey = () => {}

    return () => (
      <Card>
        <Typography.Title heading={6}>卡片列表</Typography.Title>
        <Tabs
          type="rounded"
          onChange={setActiveKey}
          activeKey={activeKey}
          v-slots={{
            extra: () => <Input placeholder="121" class="w-60" />
            // extra: () => <InputSearch placeholder="121" class="w-60" />
          }}
        >
          {tabList.map((tab) => (
            <Tabs.TabPane key={tab.title} title={tab.title}></Tabs.TabPane>
          ))}
        </Tabs>
        <div></div>
      </Card>
    )
  }
})
