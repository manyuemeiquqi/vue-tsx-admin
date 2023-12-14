import { defineComponent, ref } from 'vue'
import DataUpdateRecord from '@/views/detail/DataUpdateRecord'
import ProfileItem from '@/views/detail/ProfileItem'
import { Card, Space, Steps, Button } from '@arco-design/web-vue'
import useLoading from '@/hooks/loading'
import { useI18n } from 'vue-i18n'
import { queryProfileBasic } from '@/api/detail'

export default defineComponent({
  setup() {
    const { t } = useI18n()

    const currentData = ref({})
    const preData = ref({})
    const stepList = [
      { status: 1, label: t('basicProfile.steps.commit') },
      { status: 2, label: t('basicProfile.steps.approval') },
      { status: 3, label: t('basicProfile.steps.finish') }
    ]
    const { loading, setLoading } = useLoading(true)
    const fetchData = async () => {
      try {
        const data = await queryProfileBasic()
        currentData.value = data.data
        preData.value = data.data
      } catch (error) {
        /* empty */
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    return () => (
      <div>
        <Space size={16} direction="vertical" fill>
          <Card class="general-card" title={t('basicProfile.title.form')}>
            {{
              extra: () => (
                <Space>
                  <Button>{t('basicProfile.cancel')}</Button>
                  <Button type="primary">{t('basicProfile.goBack')}</Button>
                </Space>
              ),
              default: () => (
                <Steps line-less current={2}>
                  {stepList.map((step) => (
                    <Steps.Step>{step.label}</Steps.Step>
                  ))}
                </Steps>
              )
            }}
          </Card>
          <ProfileItem loading={loading.value} profileData={currentData.value}></ProfileItem>
          <ProfileItem loading={loading.value} profileData={preData.value}></ProfileItem>
          <DataUpdateRecord></DataUpdateRecord>
        </Space>
      </div>
    )
  }
})
