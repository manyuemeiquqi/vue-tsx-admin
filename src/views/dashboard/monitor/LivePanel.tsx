import { RadioGroup, Table, Space, Tabs } from '@arco-design/web-vue'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return (
      <Space>
        <div>
          <Tabs></Tabs>
          <RadioGroup></RadioGroup>
          <Table></Table>
        </div>
      </Space>
    )
  }
})
