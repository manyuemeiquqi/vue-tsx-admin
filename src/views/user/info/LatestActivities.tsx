import { Card, Link, List } from '@arco-design/web-vue'
import { defineComponent, ref } from 'vue'
import ActivityItem from '@/views/user/info/ActivityItem'
import axios from 'axios'
interface LatestActivity {
  id: number
  title: string
  description: string
  avatar: string
}
export default defineComponent({
  setup() {
    const activityList = ref<LatestActivity[]>([])
    const fetchData = async () => {
      try {
        const res = await axios.post<any>('/api/user/latest-activity')

        activityList.value = res.data!.data as LatestActivity[]
      } catch (error) {
        console.log('error: ', error)
      }
    }
    fetchData()

    return () => (
      <Card title="最新动态">
        {{
          extra: () => <Link>查看全部</Link>,
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
