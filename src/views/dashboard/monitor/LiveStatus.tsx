import { Card, Descriptions, Tag, Typography } from '@arco-design/web-vue'
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
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
      <Card>
        {{
          default: () => {
            return (
              <div>
                <Descriptions layout="horizontal" data={dataStatus.value} column={2}>
                  {{
                    label: ({ label }: { label: any }) =>
                      ['mainstream', 'hotStandby', 'coldStandby'].includes(label) ? (
                        <span>
                          <Typography.Text>{t(`monitor.studioStatus.${label}`)}</Typography.Text>
                          {t('monitor.studioStatus.bitRate')}
                        </span>
                      ) : (
                        <span>{label}</span>
                      )
                  }}
                </Descriptions>
                <Typography.Title heading={6}>
                  {t('monitor.studioStatus.title.pictureInfo')}
                </Typography.Title>
                <Descriptions layout="horizontal" data={dataPicture.value} column={2} />
              </div>
            )
          },
          extra: () => {
            return <Tag>{t('monitor.studioStatus.smooth')}</Tag>
          }
        }}
      </Card>
    )
  }
})
