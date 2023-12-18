import type { MessageListType, MessageRecord } from '@/api/message'
import { Avatar, Button, Link, List, Space, Tag, Typography } from '@arco-design/web-vue'
import { defineComponent, type PropType } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  props: {
    renderList: {
      type: Array as PropType<MessageListType>,
      required: true
    },
    unreadCount: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const { t } = useI18n()
    const tagTypeMap: Record<number, string> = {
      0: 'gray',
      1: 'green',
      2: 'blue',
      3: 'red'
    }
    return () => (
      <List
        data={props.renderList}
        bordered={false}
        v-slots={{
          footer() {
            return (
              <Space fill>
                <Link>{t('messageBox.allRead')}</Link>
                <Link>{t('messageBox.viewMore')}</Link>
              </Space>
            )
          },
          item({ item }: { item: MessageRecord }) {
            return (
              <List.Item actionLayout="vertical">
                {{
                  extra() {
                    return item.messageType && <Tag color={tagTypeMap[item.messageType]}></Tag>
                  },
                  default() {
                    return (
                      <div>
                        <List.Item.Meta>
                          {{
                            avatar() {
                              return (
                                <Avatar shape="circle">
                                  <img src={item.avatar} alt="alt" />
                                </Avatar>
                              )
                            },
                            title() {
                              return (
                                <Space>
                                  <span>{item.title}</span>
                                  <Typography.Text>{item.subTitle}</Typography.Text>
                                </Space>
                              )
                            },
                            description() {
                              return (
                                <div>
                                  <Typography.Paragraph>{item.content}</Typography.Paragraph>
                                  <Typography.Text>{item.time}</Typography.Text>
                                </div>
                              )
                            }
                          }}
                        </List.Item.Meta>
                      </div>
                    )
                  }
                }}
              </List.Item>
            )
          }
        }}
      ></List>
    )
  }
})
