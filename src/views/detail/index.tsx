import { queryProfileBasic, type ProfileBasicRes } from '@/api/detail'
import useLoading from '@/hooks/loading'
import DataUpdateRecord from '@/views/detail/DataUpdateRecord'
import ProfileItem from '@/views/detail/ProfileItem'
import { Button, Card, Space, Steps } from '@arco-design/web-vue'
import { computed, defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Detail',
  setup() {
    const { t } = useI18n()
    const step = ref(1)
    const stepList = computed(() => [
      { status: 1, label: t('basicProfile.steps.commit') },
      { status: 2, label: t('basicProfile.steps.approval') },
      { status: 3, label: t('basicProfile.steps.finish') }
    ])

    const { loading, setLoading } = useLoading(true)
    const { loading: preLoading, setLoading: preSetLoading } = useLoading(true)
    const currentData = ref<ProfileBasicRes>()
    const preData = ref<ProfileBasicRes>()

    const fetchData = async () => {
      try {
        const [profileData1, profileData2] = await Promise.allSettled([
          queryProfileBasic(),
          queryProfileBasic()
        ])
        if (profileData1.status === 'fulfilled') {
          currentData.value = profileData1.value.data
        }
        if (profileData2.status === 'fulfilled') {
          preData.value = profileData2.value.data
        }
        step.value = 3
      } catch (error) {
        /* empty */
      } finally {
        preSetLoading(false)
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
                <Steps v-model:current={step.value} line-less current={2}>
                  {stepList.value.map((step) => (
                    <Steps.Step>{step.label}</Steps.Step>
                  ))}
                </Steps>
              )
            }}
          </Card>
          <ProfileItem loading={loading.value} profileData={currentData.value}></ProfileItem>
          <ProfileItem loading={preLoading.value} profileData={preData.value}></ProfileItem>
          <DataUpdateRecord></DataUpdateRecord>
        </Space>
      </div>
    )
  }
})
