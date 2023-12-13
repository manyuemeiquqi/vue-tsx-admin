import { Card, Grid } from '@arco-design/web-vue'
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ChainItem from './ChainItem'
export default defineComponent({
  setup() {
    const { t } = useI18n()
    //TODO
    const isDark = false
    const renderDataList = computed(() => [
      {
        title: t('dataAnalysis.card.title.allVisitors'),
        quota: 'visitors',
        cardStyle: {
          background: isDark
            ? 'linear-gradient(180deg, #284991 0%, #122B62 100%)'
            : 'linear-gradient(180deg, #f2f9fe 0%, #e6f4fe 100%)'
        },
        chartType: 'line'
      },
      {
        title: t('dataAnalysis.card.title.contentPublished'),
        quota: 'published',
        cardStyle: {
          background: isDark
            ? ' linear-gradient(180deg, #3D492E 0%, #263827 100%)'
            : 'linear-gradient(180deg, #F5FEF2 0%, #E6FEEE 100%)'
        },
        chartType: 'bar'
      },
      {
        title: t('dataAnalysis.card.title.totalComment'),
        quota: 'comment',
        cardStyle: {
          background: isDark
            ? 'linear-gradient(180deg, #294B94 0%, #0F275C 100%)'
            : 'linear-gradient(180deg, #f2f9fe 0%, #e6f4fe 100%)'
        },
        chartType: 'line'
      },
      {
        title: t('dataAnalysis.card.title.totalShare'),
        quota: 'share',
        cardStyle: {
          background: isDark
            ? 'linear-gradient(180deg, #312565 0%, #201936 100%)'
            : 'linear-gradient(180deg, #F7F7FF 0%, #ECECFF 100%)'
        },
        chartType: 'pie'
      }
    ])

    return () => (
      <Card class="general-card" title={t('dataAnalysis.title.publicOpinion')}>
        <Grid.Row gutter={16}>
          {renderDataList.value.map((item) => (
            <Grid.Col span={6}>
              <ChainItem
                title={item.title}
                quota={item.quota}
                chartType={item.chartType}
                cardStyle={item.cardStyle}
              />
            </Grid.Col>
          ))}
        </Grid.Row>
      </Card>
    )
  }
})
