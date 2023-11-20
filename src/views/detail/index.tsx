import { defineComponent, ref } from 'vue'
import DataUpdateRecord from '@/views/detail/DataUpdateRecord'
import ProfileItem from '@/views/detail/ProfileItem'
import { Card, Space, Steps, Button } from '@arco-design/web-vue'
import axios from 'axios'
import useLoading from '@/hooks/loading'

interface ProfileBasicRes {
  status: number
  video: {
    mode: string
    acquisition: {
      resolution: string
      frameRate: number
    }
    encoding: {
      resolution: string
      rate: {
        min: number
        max: number
        default: number
      }
      frameRate: number
      profile: string
    }
  }
  audio: {
    mode: string
    acquisition: {
      channels: number
    }
    encoding: {
      channels: number
      rate: number
      profile: string
    }
  }
}
export default defineComponent({
  setup() {
    const currentStatus = ref(1)
    const currentData = ref({})
    const preData = ref({})
    const stepList = [
      { status: 1, label: '提交更改' },
      { status: 2, label: '审批中' },
      { status: 3, label: '修改完成' }
    ]
    const { loading, setLoading } = useLoading(true)
    const fetchData = async () => {
      try {
        const data = (await axios.get('/api/profile/basic')).data as ProfileBasicRes
        currentData.value = data
        preData.value = data
      } catch (error) {
        console.log('error: ', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    return () => (
      <div class=" h-screen">
        <Space size={16} direction="vertical">
          <Card title="参数流程审批表">
            {{
              extra: () => (
                <Space>
                  <Button>取消流程</Button>
                  <Button type="primary">返回</Button>
                </Space>
              ),
              default: () => (
                <Steps current={currentStatus.value}>
                  {stepList.map((step) => (
                    <Steps.Step>{step.label}</Steps.Step>
                  ))}
                </Steps>
              )
            }}
          </Card>
          <Card>
            <ProfileItem loading={loading.value} profileData={currentData.value}></ProfileItem>
          </Card>
          <Card>
            <ProfileItem loading={loading.value} profileData={preData.value}></ProfileItem>
          </Card>
          <DataUpdateRecord></DataUpdateRecord>
        </Space>
      </div>
    )
  }
})
