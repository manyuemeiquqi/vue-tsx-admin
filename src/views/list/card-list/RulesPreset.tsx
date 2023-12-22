import { queryRulesPresetList, type ServiceRecord } from '@/api/list'
import useLoading from '@/hooks/loading'
import { Card, Grid, Space, Switch, Tag, Typography } from '@arco-design/web-vue'
import { IconCheckCircleFill } from '@arco-design/web-vue/es/icon'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import SkeletonCard from './SkeletonCard'
import styles from './style.module.scss'
import { itemSpan } from '.'

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
        <Grid colGap={16} rowGap={16}>
          {loading.value
            ? fillList.map(() => <SkeletonCard loading={loading.value} />)
            : cardList.value.map((item) => (
                <Grid.Item span={itemSpan}>
                  <Card hoverable class={[styles.card]}>
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
                      actions: () => <Switch v-model={item.enable} />
                    }}
                  </Card>
                </Grid.Item>
              ))}
        </Grid>
      </div>
    )
  }
})
