import { Card, Result } from '@arco-design/web-vue'
import { IconPlus } from '@arco-design/web-vue/es/icon'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'AddCard',
  props: {
    description: {
      type: String
    }
  },
  setup(props) {
    const { t } = useI18n()
    return () => (
      <Card class=" h-44" hoverable>
        <Result title={t('cardList.content.action')}>
          {{
            icon: () => <IconPlus />
          }}
        </Result>
      </Card>
    )
  }
})
