import { Card, Input, Tabs, Typography } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import QualityInspection from './QualityInspection'
import { useI18n } from 'vue-i18n'
import TheService from './TheService'

import RulesPreset from './RulesPreset'
export default defineComponent({
  setup() {
    const { t } = useI18n()
    const tabList = [
      { title: t('cardList.tab.title.all'), value: 1 },
      { title: t('cardList.tab.title.content'), value: 2 },
      { title: t('cardList.tab.title.service'), value: 3 },
      { title: t('cardList.tab.title.preset'), value: 4 }
    ]
    const activeKey = ''
    const setActiveKey = () => {}
    return () => (
      <Card
        class="general-card "
        v-slots={{
          title: () => <Typography.Title heading={6}>卡片列表</Typography.Title>,
          extra: () => <Input />
        }}
      >
        <Tabs
          type="rounded"
          onChange={setActiveKey}
          activeKey={activeKey}
          v-slots={{
            extra: () => <Input placeholder="121" class="w-60" />
          }}
        >
          {tabList.map((tab) => (
            <Tabs.TabPane key={tab.value} title={tab.title}></Tabs.TabPane>
          ))}
        </Tabs>
        <QualityInspection />
        <TheService />
        <RulesPreset />
      </Card>
    )
  }
})
