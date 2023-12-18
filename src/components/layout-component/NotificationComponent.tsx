import {
  Avatar,
  Badge,
  Button,
  Spin,
  Tabs,
  Tooltip,
  Trigger,
  Typography
} from '@arco-design/web-vue'
import {
  IconCustomerService,
  IconDesktop,
  IconFile,
  IconMessage,
  IconNotification
} from '@arco-design/web-vue/es/icon'
import { computed, defineComponent, ref } from 'vue'
import styles from './style.module.scss'
import { useI18n } from 'vue-i18n'
import useLoading from '@/hooks/loading'
import {
  queryMessageList,
  setMessageStatus,
  type MessageRecord,
  type MessageListType
} from '@/api/message'
import MessageList from './MessageList'
export default defineComponent({
  setup() {
    const { t } = useI18n()
    const { loading, setLoading } = useLoading(true)

    const messageList = ref<MessageRecord[]>([])
    const messageType = ref('message')
    const renderList = computed(() => {
      return messageList.value.filter((item) => messageType.value === item.type)
    })
    async function fetchSourceData() {
      setLoading(true)
      try {
        const { data } = await queryMessageList()
        messageList.value = data
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        setLoading(false)
      }
    }
    fetchSourceData()
    const tabList = computed(() => [
      {
        key: 'message',
        title: t('messageBox.tab.title.message'),
        titleIcon: <IconMessage />
      },
      {
        key: 'notice',
        title: t('messageBox.tab.title.notice'),
        titleIcon: <IconCustomerService />
      },
      {
        key: 'todo',
        title: t('messageBox.tab.title.todo'),
        titleIcon: <IconFile />,
        avatar: (
          <Avatar style={{ backgroundColor: '#0FC6C2' }}>
            <IconDesktop />
          </Avatar>
        )
      }
    ])
    const unReadData = []
    const NotificationContent = () => {
      return (
        <div class={[styles['content-wrapper']]}>
          <Spin loading={loading.value}>
            <Tabs
              v-model={messageType.value}
              type="rounded"
              destroyOnHide
              v-slots={{
                extra() {
                  return <Button type="text">{t('messageBox.tab.button')}</Button>
                }
              }}
            >
              {tabList.value.map((item) => (
                <Tabs.TabPane key={item.key}>
                  {{
                    title() {
                      return (
                        <Typography.Text>
                          {item.avatar}
                          {item.title}
                          {unReadData.length ? `(${unReadData.length})` : ''}
                        </Typography.Text>
                      )
                    },
                    default() {
                      return <MessageList renderList={renderList.value} />
                    }
                  }}
                </Tabs.TabPane>
              ))}
            </Tabs>
          </Spin>
        </div>
      )
    }

    return () => (
      <Trigger trigger="click" position="br">
        {{
          default() {
            return (
              <Button class={[styles['nav-btn']]} type="outline" shape="circle">
                {{
                  icon: () => <IconNotification />
                }}
              </Button>
            )
          },
          content() {
            return <NotificationContent />
          }
        }}
      </Trigger>
    )
  }
})
