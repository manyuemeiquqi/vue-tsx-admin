import { Card, Descriptions, Skeleton } from '@arco-design/web-vue'
import { defineComponent, ref, type PropType } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  props: {
    profileData: {
      type: Object as PropType<any>
    },
    loading: {
      type: Boolean
    }
  },
  setup(props) {
    const { t } = useI18n()
    const data = props.profileData

    const blockDataList = ref<
      {
        title: string
        data: {
          label: string
          value: string
        }[]
      }[]
    >([])

    // TODO 这里是有问题的，如何监听到 prop 的响应式变化从而更新渲染状态
    blockDataList.value.push({
      title: t(`basicProfile.title.preVideo`),
      data: [
        {
          label: t('basicProfile.label.video.mode'),
          value: data?.video?.mode || '-'
        },
        {
          label: t('basicProfile.label.video.acquisition.resolution'),
          value: data?.video?.acquisition.resolution || '-'
        },
        {
          label: t('basicProfile.label.video.acquisition.frameRate'),
          value: `${data?.video?.acquisition.frameRate || '-'} fps`
        },
        {
          label: t('basicProfile.label.video.encoding.resolution'),
          value: data?.video?.encoding.resolution || '-'
        },
        {
          label: t('basicProfile.label.video.encoding.rate.min'),
          value: `${data?.video?.encoding.rate.min || '-'} bps`
        },
        {
          label: t('basicProfile.label.video.encoding.rate.max'),
          value: `${data?.video?.encoding.rate.max || '-'} bps`
        },
        {
          label: t('basicProfile.label.video.encoding.rate.default'),
          value: `${data?.video?.encoding.rate.default || '-'} bps`
        },
        {
          label: t('basicProfile.label.video.encoding.frameRate'),
          value: `${data?.video?.encoding.frameRate || '-'} fpx`
        },
        {
          label: t('basicProfile.label.video.encoding.profile'),
          value: data?.video?.encoding.profile || '-'
        }
      ]
    })

    blockDataList.value.push({
      title: t(`basicProfile.title.video`),
      data: [
        {
          label: t('basicProfile.label.audio.mode'),
          value: data?.audio?.mode || '-'
        },
        {
          label: t('basicProfile.label.audio.acquisition.channels'),
          value: `${data?.audio?.acquisition.channels || '-'} ${t(
            'basicProfile.unit.audio.channels'
          )}`
        },
        {
          label: t('basicProfile.label.audio.encoding.channels'),
          value: `${data?.audio?.encoding.channels || '-'} ${t('basicProfile.unit.audio.channels')}`
        },
        {
          label: t('basicProfile.label.audio.encoding.rate'),
          value: `${data?.audio?.encoding.rate || '-'} kbps`
        },
        {
          label: t('basicProfile.label.audio.encoding.profile'),
          value: data?.audio?.encoding.profile || '-'
        }
      ]
    })
    return () => (
      <Card class="general-card">
        <div class="pt-5">
          {blockDataList.value.map((item) => (
            <Descriptions
              title={item.title}
              data={item.data}
              label-style={{
                textAlign: 'right',
                width: '200px',
                paddingRight: '10px',
                color: 'rgb(var(--gray-8))'
              }}
              value-style={{ width: '400px' }}
            >
              {{
                value: ({ value }: any) =>
                  props.loading ? (
                    <Skeleton>
                      <Skeleton.Line widths={['200px']} rows={1}></Skeleton.Line>
                    </Skeleton>
                  ) : (
                    <span>{value}</span>
                  )
              }}
            </Descriptions>
          ))}
        </div>
      </Card>
    )
  }
})
