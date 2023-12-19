import { queryRulesPresetList, type ServiceRecord } from '@/api/list'
import useLoading from '@/hooks/loading'
import { Card, Grid, Skeleton, Space, Switch, Tag, Typography } from '@arco-design/web-vue'
import { IconCheckCircleFill } from '@arco-design/web-vue/es/icon'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'RulesPreset',
  setup() {
    const { t } = useI18n()
    const { loading, setLoading } = useLoading(true)
    const fillList = new Array(7).fill(undefined)

    const cardList = ref<ServiceRecord[]>([])
    const fetchData = async () => {
      try {
        const res = await queryRulesPresetList()
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
        <Typography.Title heading={6}>{t('cardList.tab.title.preset')}</Typography.Title>
        <Grid colGap={24} rowGap={24}>
          {loading.value
            ? fillList.map(() => (
                <Grid.Item
                  span={{
                    xs: 12,
                    sm: 12,
                    md: 12,
                    lg: 6,
                    xl: 6,
                    xxl: 6
                  }}
                >
                  <Card>
                    <Skeleton loading={loading.value} animation>
                      <Skeleton.Line widths={['100%', '40%']} rows={2}></Skeleton.Line>
                    </Skeleton>
                  </Card>
                </Grid.Item>
              ))
            : cardList.value.map((item) => (
                <Grid.Item
                  span={{
                    xs: 12,
                    sm: 12,
                    md: 12,
                    lg: 6,
                    xl: 6,
                    xxl: 6
                  }}
                >
                  <Card hoverable>
                    {{
                      default: () => (
                        <Card.Meta>
                          {{
                            title: () => (
                              <Space align="center">
                                <Typography.Text>{item.title}</Typography.Text>
                                {item.enable && (
                                  <Tag
                                    size="small"
                                    color="green"
                                    v-slots={{ icon: () => <IconCheckCircleFill /> }}
                                  >
                                    {t('cardList.preset.tag')}
                                  </Tag>
                                )}
                              </Space>
                            ),
                            description: () => (
                              <Typography.Text
                                class={['text-xs', 'text-[color:var(--color-text-3)]']}
                              >
                                {item.description}
                              </Typography.Text>
                            )
                          }}
                        </Card.Meta>
                      ),
                      actions: () => <Switch defaultChecked={item.enable} />
                    }}
                  </Card>
                </Grid.Item>
              ))}
        </Grid>
      </div>
    )
  }
})
