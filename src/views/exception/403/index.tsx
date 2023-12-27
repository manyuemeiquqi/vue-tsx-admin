import CardLayout from '@/components/card-layout'
import { ViewNames } from '@/types/constants'
import { Button, Result, Space } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: ViewNames._403,
  setup() {
    const { t } = useI18n()
    return () => (
      <div>
        <CardLayout>
          <Result status="403" subtitle={t('exception.result.403.description')}>
            {{
              extra: () => (
                <Space size="medium">
                  <Button type="primary">{t('exception.result.403.back')}</Button>
                </Space>
              )
            }}
          </Result>
        </CardLayout>
      </div>
    )
  }
})
