import { defineComponent, ref } from 'vue'
import DataUpdateRecord from '@/views/detail/DataUpdateRecord'
import ProfileItem from '@/views/detail/ProfileItem'
import { Card, Space, Steps, Button } from '@arco-design/web-vue'
export default defineComponent({
  setup() {
    const currentStatus = ref(1)
    const stepList = [
      { status: 1, label: '提交更改' },
      { status: 2, label: '审批中' },
      { status: 3, label: '修改完成' }
    ]

    return () => (
      <div class=" h-screen">
        <Space size={16} direction="vertical">
          <Card
            title="参数流程审批表"
            v-slots={{
              extra: () => (
                <Space>
                  <Button>取消流程</Button>
                  <Button type="primary">返回</Button>
                </Space>
              )
            }}
          >
            <Steps current={currentStatus.value}>
              {stepList.map((step) => (
                <Steps.Step>{step.label}</Steps.Step>
              ))}
            </Steps>
          </Card>
          <Card>
            <ProfileItem></ProfileItem>
          </Card>
          <Card>
            <ProfileItem></ProfileItem>
          </Card>
          <DataUpdateRecord></DataUpdateRecord>
        </Space>
      </div>
    )
  }
})
