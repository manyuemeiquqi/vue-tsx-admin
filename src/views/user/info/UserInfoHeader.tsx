import { Avatar, Skeleton, Space, Typography } from '@arco-design/web-vue'
import { IconCamera, IconHome, IconLocation, IconUser } from '@arco-design/web-vue/es/icon'
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    const loadingNode = <Skeleton></Skeleton>
    const loadingImgNode = <Skeleton></Skeleton>
    return () => (
      <div
        class="h-52
        bg-[url(//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/41c6b125cc2e27021bf7fcc9a9b1897c.svg~tplv-49unhts6dw-image.image)]
         flex items-center justify-center
      "
      >
        <Space direction="vertical" align="center">
          <Avatar size={64}>
            {{
              default: () => <img src="" />,
              'trigger-icon': () => <IconCamera />
            }}
          </Avatar>
          <Typography.Text> 王立群</Typography.Text>
          <Space>
            <div>
              <IconUser />
              <Typography.Text></Typography.Text>
            </div>
            <div>
              <IconHome />
            </div>
            <div>
              <IconLocation />
            </div>
          </Space>
        </Space>
      </div>
    )
  }
})
