import { Card, Input, Tabs, Typography } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import QualityInspection from './QualityInspection'
import RulesPreset from './RulesPreset'
import TheService from './TheService'
import { ViewNames } from '@/types/constants'
export const itemSpan = {
  xs: 12,
  sm: 12,
  md: 12,
  lg: 8,
  xl: 8,
  xxl: 6
} as const
export default defineComponent({
  name: ViewNames.cardList,
  setup() {
    const { t } = useI18n()
    const tabList = [
      {
        getTitle: () => t('cardList.tab.title.all'),
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
        getTitle: () => t('cardList.tab.title.content'),
        value: 2,

        pane: (
          <>
            <QualityInspection />
          </>
        )
      },
      {
        getTitle: () => t('cardList.tab.title.service'),
        value: 3,
        pane: (
          <>
            <TheService />
          </>
        )
      },
      {
        getTitle: () => t('cardList.tab.title.preset'),
        value: 4,
        pane: (
          <>
            <RulesPreset />
          </>
        )
      }
    ]
    return () => (
      <div>
        <Card
          class="general-card"
          v-slots={{
            title: () => <Typography.Title heading={6}>{t('menu.list.cardList')}</Typography.Title>
          }}
        >
          <Tabs
            type="rounded"
            defaultActiveKey={1}
            v-slots={{
              extra: () => (
                <Input placeholder={t('cardList.searchInput.placeholder')} class="w-60" />
              )
            }}
          >
            {tabList.map((tab) => (
              <Tabs.TabPane key={tab.value} title={tab.getTitle()}>
                {tab.pane}
              </Tabs.TabPane>
            ))}
          </Tabs>
        </Card>
      </div>
    )
  }
})
