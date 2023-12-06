import { queryInspectionList, type ServiceRecord } from '@/api/list'
import { Button, Card, Descriptions, Grid, Skeleton, Space, Typography } from '@arco-design/web-vue'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AddCard from './AddCard'

export default defineComponent({
  setup() {
    const cardList = ref<ServiceRecord[]>([])
    const fetchData = async () => {
      cardList.value = (await queryInspectionList()).data
    }
    const { t } = useI18n()
    fetchData()
    return () => (
      <Grid rowGap={24} colGap={24}>
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
          <AddCard />
        </Grid.Item>
        {cardList.value.map((item) => (
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
              {{
                default: () => (
                  <Card.Meta>
                    {{
                      title: () => <Typography.Text>{item.title}</Typography.Text>,
                      description: () => (
                        <>
                          {item.description}
                          <Descriptions
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
    )
  }
})
