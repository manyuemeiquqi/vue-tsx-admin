import { Card, Descriptions, Skeleton } from '@arco-design/web-vue'
import { defineComponent, type PropType } from 'vue'
import { useI18n } from 'vue-i18n'
interface ProfileBasicRes {
  status: number
  video: {
    mode: string
    acquisition: {
      resolution: string
      frameRate: number
    }
    encoding: {
      resolution: string
      rate: {
        min: number
        max: number
        default: number
      }
      frameRate: number
      profile: string
    }
  }
  audio: {
    mode: string
    acquisition: {
      channels: number
    }
    encoding: {
      channels: number
      rate: number
      profile: string
    }
  }
}
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
    console.log('props: ', props)

    const { t } = useI18n()
    const data = props.profileData
    const blockDataList: {
      title: string
      data: {
        label: string
        value: string
      }[]
    }[] = []
    blockDataList.push({
      title: t(`basicProfile.title.${'current'}Video`),
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

    blockDataList.push({
      title: t(`basicProfile.title.${'origin'}Audio`),
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
      <Card>
        {blockDataList.map((item) => (
          <Descriptions title={item.title} data={item.data}>
            {{
              value: () =>
                props.loading ? (
                  <Skeleton>
                    <Skeleton.Line rows={1}></Skeleton.Line>
                  </Skeleton>
                ) : (
                  <span></span>
                )
            }}
          </Descriptions>
        ))}
      </Card>
    )
  }
})
