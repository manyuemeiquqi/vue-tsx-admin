import { Avatar, AvatarGroup, Card, Grid, Link, Space, Typography } from '@arco-design/web-vue'
import axios from 'axios'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const dataSource = ref<any[]>([])
    const fetchData = () => {
      axios.post('/api/user/my-project/list').then((res) => {
        console.log('res: ', res)
        dataSource.value = res.data.data
      })
    }
    fetchData()
    return () => (
      <Card>
        {dataSource.value.map((item) => (
          <div>
            <Typography.Text>{item.name}</Typography.Text>
            <Typography.Text>{item.description}</Typography.Text>
            <Space>
              <AvatarGroup size={24}>
                {item.contributors.map((contributor: any) => (
                  <Avatar>
                    <img src={contributor.avatar} />
                  </Avatar>
                ))}
              </AvatarGroup>
              <Typography.Text>等人</Typography.Text>
            </Space>
          </div>
        ))}
      </Card>
    )
  }
})
