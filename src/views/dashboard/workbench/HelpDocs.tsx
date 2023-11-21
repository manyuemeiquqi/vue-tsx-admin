import { Card, Typography, Link } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  setup() {
    const links = {
      react: 'https://arco.design/react/docs/start',
      vue: 'https://arco.design/vue/docs/start',
      designLab: 'https://arco.design/themes',
      materialMarket: 'https://arco.design/material/'
    }
    const { t } = useI18n()
    return () => (
      <Card>
        <div class="flex justify-between">
          <Typography.Title heading={6}>{t('workplace.docs')}</Typography.Title>
          <Link>{t('workplace.seeMore')}</Link>
        </div>
        <div>
          {Object.entries(links).map(([key, value]) => (
            <Link href={value}>{t(`workplace.${key}`)}</Link>
          ))}
        </div>
      </Card>
    )
  }
})
