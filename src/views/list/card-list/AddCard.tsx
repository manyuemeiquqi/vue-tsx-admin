import { Card, Result } from '@arco-design/web-vue'
import { IconPlus } from '@arco-design/web-vue/es/icon'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import styles from './style.module.scss'
export default defineComponent({
  name: 'AddCard',
  setup() {
    const { t } = useI18n()
    return () => (
      <Card class={[styles['add-card']]} hoverable>
        <Result title={t('cardList.content.action')}>
          {{
            icon: () => <IconPlus class="cursor-pointer" />
          }}
        </Result>
      </Card>
    )
  }
})
