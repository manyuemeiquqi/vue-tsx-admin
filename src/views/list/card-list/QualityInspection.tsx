import { queryInspectionList, type ServiceRecord } from '@/api/list'
import useLoading from '@/hooks/loading'
import { Button, Card, Descriptions, Grid, Skeleton, Space, Typography } from '@arco-design/web-vue'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AddCard from './AddCard'
import SkeletonCard from './SkeletonCard'
import styles from './style.module.scss'
import { itemSpan } from '.'

export default defineComponent({
  name: 'QualityInspection',
  setup() {
    const { t } = useI18n()
    const { loading, setLoading } = useLoading(true)
    const cardList = ref<ServiceRecord[]>([])
    const fillList = new Array(7).fill(undefined)

    const fetchData = async () => {
      try {
        const res = await queryInspectionList()
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
        <Typography.Title heading={6}>{t('cardList.tab.title.content')}</Typography.Title>
        <Grid rowGap={16} colGap={16}>
          <Grid.Item span={itemSpan}>
            <AddCard />
          </Grid.Item>
          {loading.value
            ? fillList.map(() => <SkeletonCard loading={loading.value} />)
            : cardList.value.map((item) => (
                <Grid.Item span={itemSpan}>
                  <Card class={[styles.card]} hoverable>
                    {{
                      default: () => (
                        <Card.Meta>
                          {{
                            title: () => <Typography.Text>{item.title}</Typography.Text>,
                            description: () => (
                              <>
                                <div class={['text-[rgb(var(--gray-6))]', 'mb-4', 'mt-4']}>
                                  {item.description}
                                </div>
                                <Descriptions
                                  class={[styles['card-desc']]}
                                  data={item.data}
                                  layout="inline-horizontal"
                                  column={2}
                                  v-slots={{
                                    skeleton: () => (
                                      <Skeleton animation>
                                        <Skeleton.Line
                                          widths={['50%', '50%', '100%', '40%']}
                                          rows={4}
                                        ></Skeleton.Line>
                                        <Skeleton.Line widths={['40%']} rows={1}></Skeleton.Line>
                                      </Skeleton>
                                    )
                                  }}
                                ></Descriptions>
                              </>
                            )
                          }}
                        </Card.Meta>
                      ),
                      actions: () => (
                        <Space>
                          <Button>{t('cardList.content.delete')}</Button>
                          <Button type="primary">{t('cardList.content.inspection')}</Button>
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
