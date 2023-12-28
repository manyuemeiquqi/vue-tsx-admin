import { userUploadApi } from '@/api/user'
import { useUserStore } from '@/store'
import {
  Avatar,
  Card,
  Descriptions,
  Message,
  Space,
  Tag,
  Upload,
  type FileItem,
  type RequestOption
} from '@arco-design/web-vue'
import type { DescData } from '@arco-design/web-vue/es/descriptions/interface'
import { IconCamera } from '@arco-design/web-vue/es/icon'
import { computed, defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: 'UserPanel',
  setup() {
    const { t } = useI18n()
    const userStore = useUserStore()
    const userInfoData = computed(() => [
      {
        label: t('userSetting.label.name'),
        value: userStore.name
      },
      {
        label: t('userSetting.label.certification'),
        value: userStore.certification
      },
      {
        label: t('userSetting.label.accountId'),
        value: userStore.accountId
      },
      {
        label: t('userSetting.label.phone'),
        value: userStore.phone
      },
      {
        label: t('userSetting.label.registrationDate'),
        value: userStore.registrationDate
      }
    ])

    const fileList = ref<FileItem[]>()
    const handleUploadChange = (fileItemList: FileItem[], fileItem: FileItem) => {
      fileList.value = [fileItem]
    }
    const avatarSrc = computed(() => {
      if (fileList.value) {
        return fileList.value[0].url
      }
      return userStore.avatar
    })
    const customRequest = (options: RequestOption) => {
      const controller = new AbortController()
      ;(async function requestWrap() {
        const { onError, onSuccess, fileItem, name = 'file' } = options
        const formData = new FormData()
        formData.append(name as string, fileItem.file as Blob)
        try {
          const res = await userUploadApi(formData)
          onSuccess(res)
          Message.success('上传成功')
        } catch (error) {
          onError(error)
        }
      })()
      return {
        abort() {
          controller.abort()
        }
      }
    }

    return () => (
      <Card bordered={false} class="rounded">
        <Space size={54}>
          <Upload
            v-slots={{
              'upload-button': () => (
                <div>
                  <Avatar size={100}>
                    {{
                      'trigger-icon': () => <IconCamera />,
                      default: () => <img src={avatarSrc.value} alt="alt" />
                    }}
                  </Avatar>
                </div>
              )
            }}
            showUploadButton={true}
            listType="picture-card"
            showFileList={false}
            onChange={handleUploadChange}
            customRequest={customRequest}
          />
          <Descriptions
            layout="inline-horizontal"
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
            align="right"
            column={2}
            data={userInfoData.value as DescData[]}
          >
            {{
              label: ({ label }: { label: string }) => {
                return label
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
