import { Avatar, List } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ActivityItem',
  props: {
    title: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  setup(props) {
    return () => (
      <List.Item>
        <List.Item.Meta
          title={props.title}
          description={props.description}
          v-slots={{
            avatar: () => (
              <Avatar>
                <img src={props.avatar} alt="avatar" />
              </Avatar>
            )
          }}
        />
      </List.Item>
    )
  }
})
