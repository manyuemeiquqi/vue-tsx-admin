import { defineComponent } from 'vue'
import { Button, Result } from '@arco-design/web-vue'
import { useI18n } from 'vue-i18n'
import CardLayout from '@/components/card-layout'
import { ViewNames } from '@/types/constants'

export default defineComponent({
  name: ViewNames._500,
  setup() {
    const { t } = useI18n()
    return () => (
      <div>
        <CardLayout>
          <Result status="500" subtitle={t('exception.result.500.description')}>
            {{
              extra: () => <Button type="primary">{t('exception.result.500.back')}</Button>
            }}
          </Result>
        </CardLayout>
      </div>
    )
  }
})
