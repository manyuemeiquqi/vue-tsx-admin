import { queryLatestActivity, type LatestActivity } from '@/api/user'
import useLoading from '@/hooks/loading'
import ActivityItem from '@/views/user/info/ActivityItem'
import { Card, Grid, Link, List, Skeleton } from '@arco-design/web-vue'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'LatestActivities',
  setup() {
    const { t } = useI18n()
    const { loading, setLoading } = useLoading(true)
    const fillList = new Array(7).fill(undefined)
    const activityList = ref<LatestActivity[]>([])
    const fetchData = async () => {
      try {
        const res = await queryLatestActivity()
        activityList.value = res.data
      } catch (error) {
        /* empty */
      } finally {
        setLoading(false)
      }
    }
    fetchData()

    return () => (
      <Card class="general-card" title={t('userInfo.title.latestActivity')}>
        {{
          extra: () => <Link>{t('userInfo.viewAll')}</Link>,
          default: () => (
            <List bordered={false}>
              {loading.value
                ? fillList.map(() => (
                    <Skeleton loading={loading.value} animation class="mb-4">
                      <Grid.Row gutter={6}>
                        <Grid.Col span={2}>
                          <Skeleton.Shape shape="circle"></Skeleton.Shape>
                        </Grid.Col>
                        <Grid.Col span={22}>
                          <Skeleton.Line widths={['40%', '100%']} rows={2}></Skeleton.Line>
                        </Grid.Col>
                      </Grid.Row>
                    </Skeleton>
                  ))
                : activityList.value.map((item, index) => (
                    <ActivityItem
                      key={index}
                      avatar={item.avatar}
                      title={item.title}
                      description={item.description}
                    />
                  ))}
            </List>
          )
        }}
      </Card>
    )
  }
})
