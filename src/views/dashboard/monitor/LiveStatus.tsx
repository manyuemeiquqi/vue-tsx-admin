import { Card, Descriptions, Tag, Typography } from '@arco-design/web-vue'
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: 'LiveStatus',
  setup() {
    const { t } = useI18n()
    const dataStatus = computed(() => [
      {
        label: 'mainstream',
        value: '6 Mbps'
      },
      {
        label: t('monitor.studioStatus.frameRate'),
        value: '60'
      },
      {
        label: 'hotStandby',
        value: '6 Mbps'
      },
      {
        label: t('monitor.studioStatus.frameRate'),
        value: '60'
      },
      {
        label: 'coldStandby',
        value: '6 Mbps'
      },
      {
        label: t('monitor.studioStatus.frameRate'),
        value: '60'
      }
    ])
    const dataPicture = computed(() => [
      {
        label: t('monitor.studioStatus.line'),
        value: '热备'
      },
      {
        label: 'CDN',
        value: 'KS'
      },
      {
        label: t('monitor.studioStatus.play'),
        value: 'FLV'
      },
      {
        label: t('monitor.studioStatus.pictureQuality'),
        value: '原画'
      }
    ])
    return () => (
      <Card class="general-card" title={t('monitor.studioStatus.title.studioStatus')}>
        {{
          default: () => {
            return (
              <div>
                <Descriptions
                  layout="horizontal"
                  valueStyle={{
                    whiteSpace: 'nowrap'
                  }}
                  labelStyle={{
                    paddingRight: '8px'
                  }}
                  data={dataStatus.value}
                  column={2}
                >
                  {{
                    label: ({ label }: { label: string }) =>
                      ['mainstream', 'hotStandby', 'coldStandby'].includes(label) ? (
                        <>
                          <Typography.Text class="whitespace-nowrap  mr-1">
                            {t(`monitor.studioStatus.${label}`)}
                          </Typography.Text>
                          <span>{t('monitor.studioStatus.bitRate')}:</span>
                        </>
                      ) : (
                        <span>{label}:</span>
                      )
                  }}
                </Descriptions>
                <Typography.Title heading={6}>
                  {t('monitor.studioStatus.title.pictureInfo')}
                </Typography.Title>
                <Descriptions
                  v-slots={{
                    label({ label }: any) {
                      return <span>{label}:</span>
                    }
                  }}
                  labelStyle={{
                    paddingRight: '8px'
                  }}
                  layout="horizontal"
                  data={dataPicture.value}
                  column={2}
                />
              </div>
            )
          },
          extra: () => {
            return <Tag color="green">{t('monitor.studioStatus.smooth')}</Tag>
          }
        }}
      </Card>
    )
  }
})
