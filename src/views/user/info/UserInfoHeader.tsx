import { useUserStore } from '@/store'
import { Avatar, Space, Typography } from '@arco-design/web-vue'
import { IconCamera, IconHome, IconLocation, IconUser } from '@arco-design/web-vue/es/icon'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'UserInfoHeader',
  setup() {
    const userStore = useUserStore()
    return () => (
      <div
        class={['h-52', 'flex', 'items-center', 'justify-center ']}
        style={{
          background:
            'url(https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/header-banner.fcb7b1aa6ce12d210c85.png) no-repeat',
          backgroundSize: '100%'
        }}
      >
        <Space direction="vertical" size="mini" align="center">
          <Avatar size={64}>
            {{
              default: () => (
                <img
                  src="https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/54520846%20(1).jpg"
                  alt="avatar"
                />
              ),
              'trigger-icon': () => <IconCamera />
            }}
          </Avatar>
          <Typography.Title class="!my-0" heading={6}>
            {userStore.name}
          </Typography.Title>
          <Space size={'small'}>
            <div>
              <IconUser class="mr-1" />
              <Typography.Text>{userStore.jobName}</Typography.Text>
            </div>
            <div>
              <IconHome class="mr-1" />
              <Typography.Text>{userStore.organizationName}</Typography.Text>
            </div>
            <div>
              <IconLocation class="mr-1" />
              <Typography.Text>{userStore.locationName}</Typography.Text>
            </div>
          </Space>
        </Space>
      </div>
    )
  }
})
