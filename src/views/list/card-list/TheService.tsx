import { queryTheServiceList, type ServiceRecord } from '@/api/list'
import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Grid,
  Skeleton,
  Space,
  Switch,
  Tag,
  Typography
} from '@arco-design/web-vue'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AddCard from './AddCard'
import { IconCheckCircleFill, IconFilter } from '@arco-design/web-vue/es/icon'

export default defineComponent({
  setup() {
    const cardList = ref<ServiceRecord[]>([])
    const fetchData = async () => {
      cardList.value = (await queryTheServiceList()).data
    }

    const { t } = useI18n()
    fetchData()
    return () => (
      <Grid colGap={24}>
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
                  <Space>
                    {item.icon && (
                      <Avatar size={24}>
                        <IconFilter />
                      </Avatar>
                    )}
                    <Card.Meta>
                      {{
                        title: () => (
                          <>
                            <Typography.Text>{item.title}</Typography.Text>

                            <Tag
                              size="small"
                              color="green"
                              v-slots={{
                                icon: () => <IconCheckCircleFill />
                              }}
                            ></Tag>
                          </>
                        ),
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
                  </Space>
                ),
                actions: () => <Switch></Switch>
              }}
            </Card>
          </Grid.Item>
        ))}
      </Grid>
    )
  }
})
