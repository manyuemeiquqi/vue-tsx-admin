import { Avatar, Card, Descriptions, Space, Tag, Upload } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import type { DescData } from '@arco-design/web-vue/es/descriptions/interface'
import { useUserStore } from '@/store'
import { useI18n } from 'vue-i18n'
import { IconCamera } from '@arco-design/web-vue/es/icon'
const userStore = useUserStore()
export default defineComponent({
  setup() {
    const { t } = useI18n()
    const userInfoData = [
      {
        label: 'userSetting.label.name',
        value: userStore.name
      },
      {
        label: 'userSetting.label.certification',
        value: userStore.certification
      },
      {
        label: 'userSetting.label.accountId',
        value: userStore.accountId
      },
      {
        label: 'userSetting.label.phone',
        value: userStore.phone
      },
      {
        label: 'userSetting.label.registrationDate',
        value: userStore.registrationDate
      }
    ] as DescData[]
    return () => (
      <Card bordered={false} class=" rounded">
        <Space size={54}>
          <Upload
            v-slots={{
              'upload-button': () => (
                <div>
                  <Avatar size={100}>
                    {{
                      'trigger-icon': () => <IconCamera />,
                      default: () => (
                        <img
                          src="https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/54520846%20(1).jpg"
                          alt="alt"
                        />
                      )
                    }}
                  </Avatar>
                </div>
              )
            }}
            showUploadButton={true}
            listType={'picture-card'}
            showFileList={false}
          />
          <Descriptions
            layout={'inline-horizontal'}
            label-style={{
              width: '140px',
              fontWeight: 'normal',
              color: 'rgb(var(--gray-8))'
            }}
            value-style={{
              width: '200px',
              paddingLeft: '8px',
              textAlign: 'left'
            }}
            align={'right'}
            column={2}
            data={userInfoData}
          >
            {{
              label: ({ label }: { label: string }) => {
                return t(label) + ' ：'
              },
              value: ({ value, data }: { value: string; data: DescData }) => {
                if (data.label === 'userSetting.label.certification')
                  return (
                    <Tag color="green" size="small">
                      已认证
                    </Tag>
                  )
                else return <span>{value}</span>
              }
            }}
          </Descriptions>
        </Space>
      </Card>
    )
  }
})
