import { Button, Card, Input, Link, Option, Select, Space } from '@arco-design/web-vue'
import { IconDownload, IconFaceSmileFill } from '@arco-design/web-vue/es/icon'
import { defineComponent, ref } from 'vue'
import MessageItem from './MessageItem'
import { useI18n } from 'vue-i18n'
import { queryChatList, type ChatRecord } from '@/api/list'
export default defineComponent({
  setup() {
    const chatData = ref<ChatRecord[]>([])
    const fetchData = async () => {
      try {
        const { data } = await queryChatList()
        chatData.value = data
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        // you can report use errorHandler or other
      }
    }
    fetchData()
    const { t } = useI18n()
    return () => (
      <Card class="general-card" title={t('monitor.title.chatPanel')}>
        <Space fill class="mb-4">
          <Select defaultValue="all">
            <Option value="all">{t('monitor.chat.options.all')}</Option>
          </Select>
          <Input placeholder={t('monitor.chat.placeholder.searchCategory')}></Input>
          <Link>
            <IconDownload />
          </Link>
        </Space>
        <div class="mb-4">
          {chatData.value.map((item) => (
            <MessageItem data={item} />
          ))}
        </div>
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
