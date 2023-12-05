import { Button, Card, Grid, Input, Link, Option, Select, Space } from '@arco-design/web-vue'
import { IconDownload, IconFaceSmileFill } from '@arco-design/web-vue/es/icon'
import axios from 'axios'
import { defineComponent, ref } from 'vue'
import MessageItem from './MessageItem'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  setup() {
    const chatData = ref([])
    const fetchData = async () => {
      try {
        const { data } = await axios.post<any>('/api/message/list')
        chatData.value = data
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        console.log('121')
      }
    }
    fetchData()
    const { t } = useI18n()
    return () => (
      <Card class="general-card" title={t('monitor.title.chatPanel')}>
        <Space fill>
          <Select defaultValue="all">
            <Option value="all">{t('monitor.chat.options.all')}</Option>
          </Select>
          <Input placeholder={t('monitor.chat.placeholder.searchCategory')}></Input>
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
          <Button type="primary">{t('monitor.chat.update')}</Button>
        </Space>
      </Card>
    )
  }
})
