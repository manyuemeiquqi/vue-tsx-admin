import CardLayout from '@/components/card-layout'
import { ViewNames } from '@/types/constants'
import { Button, Result, Space, Steps, Typography } from '@arco-design/web-vue'
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: ViewNames.success,
  setup() {
    const { t } = useI18n()
    const stepList = computed(() => {
      return [
        {
          title: t('success.submitApplication'),
          description: '2020/10/10 14:00:39'
        },
        {
          title: t('success.leaderReview'),
          description: t('success.processing')
        },
        {
          title: t('success.purchaseCertificate'),
          description: t('success.waiting')
        },
        {
          title: t('success.safetyTest'),
          description: t('success.waiting')
        },
        {
          title: t('success.launched'),
          description: t('success.waiting')
        }
      ]
    })
    return () => (
      <div>
        <CardLayout>
          <Result
            title={t('success.result.title')}
            subtitle={t('success.result.subTitle')}
            status="success"
          >
            {{
              extra: () => (
                <Space size="medium">
                  <Button type="secondary">{t('success.result.printResult')}</Button>
                  <Button type="primary">{t('success.result.projectList')}</Button>
                </Space>
              ),
              default: () => (
                <div class={['bg-[rgb(var(--gray-1))]', 'mt-10', 'min-w-fit', 'p-5']}>
                  <Typography.Paragraph>{t('success.result.progress')}</Typography.Paragraph>
                  <Steps type="dot" current={2}>
                    {stepList.value.map((item) => {
                      return (
                        <Steps.Step title={item.title} description={item.description}></Steps.Step>
                      )
                    })}
                  </Steps>
                </div>
              )
            }}
          </Result>
        </CardLayout>
      </div>
    )
  }
})
