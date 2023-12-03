import { useUserStore } from '@/store'
import { Avatar, Skeleton, Space, Typography } from '@arco-design/web-vue'
import { IconCamera, IconHome, IconLocation, IconUser } from '@arco-design/web-vue/es/icon'
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    const loadingNode = <Skeleton></Skeleton>
    const loadingImgNode = <Skeleton></Skeleton>
    const userInfo = useUserStore()
    // 这里userInfo 是否要保持响应式，需要测试
    return () => (
      <div
        class="h-52
         flex items-center justify-center
      "
        style={{
          background:
            'url(//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/41c6b125cc2e27021bf7fcc9a9b1897c.svg~tplv-49unhts6dw-image.image) no-repeat'
        }}
      >
        <Space direction="vertical" align="center">
          <Avatar size={64}>
            {{
              default: () => <img src="" />,
              'trigger-icon': () => <IconCamera />
            }}
          </Avatar>
          <Typography.Title heading={6}> {userInfo.name}</Typography.Title>
          <Space size={'small'}>
            <div>
              <IconUser />

              <Typography.Text>{userInfo.jobName}</Typography.Text>
            </div>
            <div>
              <IconHome />
              <Typography.Text>{userInfo.organizationName}</Typography.Text>
            </div>
            <div>
              <IconLocation />
              <Typography.Text>{userInfo.locationName}</Typography.Text>
            </div>
          </Space>
        </Space>
      </div>
    )
  }
})
