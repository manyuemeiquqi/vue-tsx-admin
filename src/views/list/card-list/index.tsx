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
      {
        title: t('cardList.tab.title.all'),
        value: 1,
        pane: (
          <>
            <QualityInspection />
            <TheService />
            <RulesPreset />
          </>
        )
      },
      {
        title: t('cardList.tab.title.content'),
        value: 2,

        pane: (
          <>
            <QualityInspection />
          </>
        )
      },
      {
        title: t('cardList.tab.title.service'),
        value: 3,
        pane: (
          <>
            <TheService />
          </>
        )
      },
      {
        title: t('cardList.tab.title.preset'),
        value: 4,
        pane: (
          <>
            <RulesPreset />
          </>
        )
      }
    ]
    return () => (
      <Card
        class="general-card "
        v-slots={{
          title: () => <Typography.Title heading={6}>{t('menu.list.cardList')}</Typography.Title>
        }}
      >
        <Tabs
          type="rounded"
          defaultActiveKey={1}
          v-slots={{
            extra: () => <Input placeholder={t('cardList.searchInput.placeholder')} class="w-60" />
          }}
        >
          {tabList.map((tab) => (
            <Tabs.TabPane key={tab.value} title={tab.title}>
              {tab.pane}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Card>
    )
  }
})
