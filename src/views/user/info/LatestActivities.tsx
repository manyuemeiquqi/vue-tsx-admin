import { Card, Link, List } from '@arco-design/web-vue'
import { defineComponent, ref } from 'vue'
import ActivityItem from '@/views/user/info/ActivityItem'
import { useI18n } from 'vue-i18n'
import { queryLatestActivity } from '@/api/user'
interface LatestActivity {
  id: number
  title: string
  description: string
  avatar: string
}
export default defineComponent({
  setup() {
    const { t } = useI18n()
    const activityList = ref<LatestActivity[]>([])
    const fetchData = async () => {
      try {
        const res = await queryLatestActivity()
        activityList.value = res.data
      } catch (error) {
        console.log('error: ', error)
      }
    }
    fetchData()

    return () => (
      <Card class="general-card" title={t('userInfo.title.latestActivity')}>
        {{
          extra: () => <Link>{t('userInfo.viewAll')}</Link>,
          default: () => (
            <List bordered={false}>
              {activityList.value.map((item, index) => (
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
