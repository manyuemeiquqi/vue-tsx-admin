import useLoading from '@/hooks/loading'
import {
  Button,
  Card,
  Input,
  Link,
  Option,
  Select,
  Skeleton,
  SkeletonLine,
  Space
} from '@arco-design/web-vue'
import { IconDownload, IconFaceSmileFill } from '@arco-design/web-vue/es/icon'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import MessageItem from './MessageItem'
import { queryChatList } from '@/api/dashboard'
import type { ChatRecord } from '@/api/dashboard/type'

export default defineComponent({
  name: 'ChatPanel',
  setup() {
    const chatData = ref<ChatRecord[]>([])

    const { loading, setLoading } = useLoading(true)
    const fillList = new Array(8).fill(undefined)
    const fetchData = async () => {
      try {
        const { data } = await queryChatList()
        chatData.value = data
      } catch (err) {
        /* empty */
      } finally {
        setLoading(false)
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
        <div class="mb-4  h-[800px] overflow-auto">
          {loading.value
            ? fillList.map(() => (
                <Skeleton class="mb-4" loading={loading.value} animation>
                  <SkeletonLine rows={3} widths={['40%', '80%', '40%']}></SkeletonLine>
                </Skeleton>
              ))
            : chatData.value.map((item) => <MessageItem data={item} />)}
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
