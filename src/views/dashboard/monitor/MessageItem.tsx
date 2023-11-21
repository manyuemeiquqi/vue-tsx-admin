import { Space, Typography } from '@arco-design/web-vue'
import { IconCommand, IconStar } from '@arco-design/web-vue/es/icon'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  setup(props) {
    return () => (
      <Space size={4} direction="vertical">
        <Typography.Text>{props.data.username}</Typography.Text>
        <Typography.Text>{props.data.content}</Typography.Text>
        <div>
          <div>
            <Typography.Text>{props.data.time}</Typography.Text>
          </div>
          <div>
            <div>
              <IconCommand />
            </div>
            <div>
              <IconStar />
            </div>
          </div>
        </div>
      </Space>
    )
  }
})
