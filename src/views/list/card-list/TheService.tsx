import { queryTheServiceList, type ServiceRecord } from '@/api/list'
import useLoading from '@/hooks/loading'
import { Avatar, Button, Card, Grid, Space, Tag, Typography } from '@arco-design/web-vue'
import { IconCheckCircleFill, IconFilter } from '@arco-design/web-vue/es/icon'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import SkeletonCard from './SkeletonCard'
import styles from './style.module.scss'
import { itemSpan } from '.'

export default defineComponent({
  name: 'TheService',
  setup() {
    const { t } = useI18n()

    const { loading, setLoading } = useLoading(true)
    const cardList = ref<ServiceRecord[]>([])
    const fillList = new Array(7).fill(undefined)
    const fetchData = async () => {
      try {
        const res = await queryTheServiceList()
        cardList.value = res.data
      } catch (error) {
        /* empty */
      } finally {
        setLoading(false)
      }
    }
    fetchData()

    return () => (
      <div>
        <Typography.Title heading={6}>{t('cardList.tab.title.service')}</Typography.Title>
        <Grid rowGap={16} colGap={16}>
          {loading.value
            ? fillList.map(() => <SkeletonCard loading={loading.value} />)
            : cardList.value.map((item) => (
                <Grid.Item span={itemSpan}>
                  <Card class={[styles.card]} hoverable>
                    {{
                      default: () => (
                        <Space align="start">
                          {item.icon && (
                            <Avatar size={24} class={['mr-2', 'bg-[#626aea]']}>
                              <IconFilter />
                            </Avatar>
                          )}
                          <Card.Meta>
                            {{
                              title: () => (
                                <Space align="center">
                                  <Typography.Text>{item.title}</Typography.Text>
                                  {item.enable &&
                                    (item.expires ? (
                                      <Tag
                                        size="small"
                                        color="red"
                                        v-slots={{
                                          icon: () => <IconCheckCircleFill />
                                        }}
                                      >
                                        {t('cardList.service.expiresTag')}
                                      </Tag>
                                    ) : (
                                      <Tag
                                        size="small"
                                        color="green"
                                        v-slots={{
                                          icon: () => <IconCheckCircleFill />
                                        }}
                                      >
                                        {t('cardList.service.tag')}
                                      </Tag>
                                    ))}
                                </Space>
                              ),
                              description: () => (
                                <div
                                  class={['text-xs', 'text-[rgb(var(--gray-6))]', 'mt-2', 'mb-2']}
                                >
                                  {item.description}
                                </div>
                              )
                            }}
                          </Card.Meta>
                        </Space>
                      ),
                      actions: () => (
                        <Space>
                          {item.expires ? (
                            <Button type="outline" onClick={() => (item.expires = !item.expires)}>
                              {t('cardList.service.renew')}
                            </Button>
                          ) : item.enable ? (
                            <Button
                              onClick={() => {
                                item.enable = !item.enable
                              }}
                            >
                              {t('cardList.service.cancel')}
                            </Button>
                          ) : (
                            <Button
                              type="outline"
                              onClick={() => {
                                item.enable = !item.enable
                              }}
                            >
                              {t('cardList.service.open')}
                            </Button>
                          )}
                        </Space>
                      )
                    }}
                  </Card>
                </Grid.Item>
              ))}
        </Grid>
      </div>
    )
  }
})
