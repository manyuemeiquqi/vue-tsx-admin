import type { ProfileBasicRes } from '@/api/profile'
import { Card, Descriptions, Skeleton, type DescData } from '@arco-design/web-vue'
import { computed, defineComponent, type PropType } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ProfileItem',
  props: {
    profileData: {
      type: Object as PropType<ProfileBasicRes>,
      default: () => ({
        status: 0,
        video: {
          mode: '',
          acquisition: {
            resolution: '',
            frameRate: 0
          },
          encoding: {
            resolution: '',
            rate: {
              min: 0,
              max: 0,
              default: 0
            },
            frameRate: 0,
            profile: ''
          }
        },
        audio: {
          mode: '',
          acquisition: {
            channels: 0
          },
          encoding: {
            channels: 0,
            rate: 0,
            profile: ''
          }
        }
      })
    },
    loading: {
      type: Boolean
    }
  },
  setup(props) {
    const { t } = useI18n()
    type BlockData = {
      title: string
      descData: DescData[]
    }
    const blockDataList = computed(() => {
      const ret: BlockData[] = []
      const { video, audio } = props.profileData
      // assign render data
      ret.push({
        title: t(`basicProfile.title.preVideo`),
        descData: [
          {
            label: t('basicProfile.label.video.mode'),
            value: video?.mode || '-'
          },
          {
            label: t('basicProfile.label.video.acquisition.resolution'),
            value: video?.acquisition.resolution || '-'
          },
          {
            label: t('basicProfile.label.video.acquisition.frameRate'),
            value: `${video?.acquisition.frameRate || '-'} fps`
          },
          {
            label: t('basicProfile.label.video.encoding.resolution'),
            value: video?.encoding.resolution || '-'
          },
          {
            label: t('basicProfile.label.video.encoding.rate.min'),
            value: `${video?.encoding.rate.min || '-'} bps`
          },
          {
            label: t('basicProfile.label.video.encoding.rate.max'),
            value: `${video?.encoding.rate.max || '-'} bps`
          },
          {
            label: t('basicProfile.label.video.encoding.rate.default'),
            value: `${video?.encoding.rate.default || '-'} bps`
          },
          {
            label: t('basicProfile.label.video.encoding.frameRate'),
            value: `${video?.encoding.frameRate || '-'} fpx`
          },
          {
            label: t('basicProfile.label.video.encoding.profile'),
            value: video?.encoding.profile || '-'
          }
        ]
      })
      ret.push({
        title: t(`basicProfile.title.video`),
        descData: [
          {
            label: t('basicProfile.label.audio.mode'),
            value: audio?.mode || '-'
          },
          {
            label: t('basicProfile.label.audio.acquisition.channels'),
            value: `${audio?.acquisition.channels || '-'} ${t('basicProfile.unit.audio.channels')}`
          },
          {
            label: t('basicProfile.label.audio.encoding.channels'),
            value: `${audio?.encoding.channels || '-'} ${t('basicProfile.unit.audio.channels')}`
          },
          {
            label: t('basicProfile.label.audio.encoding.rate'),
            value: `${audio?.encoding.rate || '-'} kbps`
          },
          {
            label: t('basicProfile.label.audio.encoding.profile'),
            value: audio?.encoding.profile || '-'
          }
        ]
      })
      return ret
    })

    return () => (
      <Card class="general-card">
        <div class="pt-5">
          {blockDataList.value.map((item) => (
            <Descriptions
              title={item.title}
              data={item.descData}
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
