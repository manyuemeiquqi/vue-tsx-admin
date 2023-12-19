import { Button, Card, Space } from '@arco-design/web-vue'
import { IconTags, IconStop, IconSwap, IconArrowRight } from '@arco-design/web-vue/es/icon'
import { defineComponent, h } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: 'QuickOperation',
  setup() {
    const { t } = useI18n()
    const quickOperationList = [
      { getTitle: () => t('monitor.quickOperation.changeClarity'), icon: IconTags },
      { getTitle: () => t('monitor.quickOperation.switchStream'), icon: IconSwap },
      { getTitle: () => t('monitor.quickOperation.removeClarity'), icon: IconStop },
      { getTitle: () => t('monitor.quickOperation.pushFlowGasket'), icon: IconArrowRight }
    ]
    return () => (
      <Card class="general-card" title={t('monitor.title.quickOperation')}>
        <Space direction="vertical" size="small" fill>
          {quickOperationList.map((item) => (
            <Button long>
              {{
                icon: () => {
                  return h(item.icon)
                },
                default: () => item.getTitle()
              }}
            </Button>
          ))}
        </Space>
      </Card>
    )
  }
})
