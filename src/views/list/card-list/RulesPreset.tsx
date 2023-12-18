import { queryRulesPresetList, type ServiceRecord } from '@/api/list'
import {
  Button,
  Card,
  Descriptions,
  Grid,
  Skeleton,
  Space,
  Switch,
  Typography
} from '@arco-design/web-vue'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AddCard from './AddCard'

export default defineComponent({
  name: 'RulesPreset',
  setup() {
    const cardList = ref<ServiceRecord[]>([])
    const fetchData = async () => {
      cardList.value = (await queryRulesPresetList()).data
    }
    const { t } = useI18n()
    fetchData()
    return () => (
      <div>
        <Typography.Title heading={6}>{t('cardList.tab.title.preset')}</Typography.Title>
        <Grid colGap={24} rowGap={24}>
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
              <Card hoverable>
                {{
                  default: () => (
                    <Card.Meta>
                      {{
                        title: () => (
                          <>
                            <Typography.Text>{item.title}</Typography.Text>
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
                  ),
                  actions: () => <Switch />
                }}
              </Card>
            </Grid.Item>
          ))}
        </Grid>
      </div>
    )
  }
})
