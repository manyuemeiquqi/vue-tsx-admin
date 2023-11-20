import { Avatar, Card, Descriptions, Space, Upload } from '@arco-design/web-vue'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return () => (
      <Card bordered={false}>
        <Space size={54}>
          <Upload>
            {{
              'upload-button': () => (
                <Avatar>
                  <img src="" alt="" />
                </Avatar>
              )
            }}
          </Upload>
          <Descriptions></Descriptions>
        </Space>
      </Card>
    )
  }
})
