import { Avatar, Card, List } from '@arco-design/web-vue'
import axios from 'axios'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const dataSource = ref([])
    const defaultValue: any[] = new Array(4).fill({})
    // const { loading, response: teamList } = useRequest<MyTeamRecord[]>(
    //   queryMyTeamList,
    //   defaultValue
    // )
    const fetchData = () => {
      axios.post('/api/user/my-team/list').then((res) => {
        console.log('res: ', res)
        dataSource.value = res.data.data
      })
    }
    fetchData()
    return () => (
      <Card>
        <List>
          {dataSource.value.map((item: any) => (
            <List.Item>
              <List.Item.Meta title={item.name} description={`${item.peopleNumber}人`}>
                {{
                  avatar: () => (
                    <Avatar shape="circle">
                      <img src={item.avatar} />
                    </Avatar>
                  )
                }}
              </List.Item.Meta>
            </List.Item>
          ))}
        </List>
      </Card>
    )
  }
})
