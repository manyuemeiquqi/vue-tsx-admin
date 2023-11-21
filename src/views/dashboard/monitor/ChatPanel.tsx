import { Button, Card, Grid, Input, Link, Select, Space } from '@arco-design/web-vue'
import { IconDownload, IconFaceSmileFill } from '@arco-design/web-vue/es/icon'
import axios from 'axios'
import { defineComponent, ref } from 'vue'
import MessageItem from './MessageItem'

export default defineComponent({
  setup() {
    const chatData = ref([])
    const fetchData = async () => {
      try {
        const { data } = await axios.post<any>('/api/message/list')
        console.log('data: ', data)
        chatData.value = data.data
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        console.log('121')
      }
    }
    fetchData()
    return () => (
      <Card>
        <Space>
          <Select></Select>
          <Input></Input>
          <Link>
            <IconDownload />
          </Link>
        </Space>
        {chatData.value.map((item) => (
          <MessageItem data={item} />
        ))}
        <Space>
          <Input>
            {{
              suffix: () => <IconFaceSmileFill />
            }}
          </Input>
          <Button>112</Button>
        </Space>
      </Card>
    )
  }
})
