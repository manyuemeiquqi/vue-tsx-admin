import { Button, Card } from '@arco-design/web-vue'
import { IconTags, IconStop, IconSwap, IconArrowRight } from '@arco-design/web-vue/es/icon'
import { defineComponent, h } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  setup() {
    const { t } = useI18n()
    const quickOperationList = [
      { title: t('monitor.quickOperation.changeClarity'), icon: IconTags },
      { title: t('monitor.quickOperation.switchStream'), icon: IconSwap },
      { title: t('monitor.quickOperation.removeClarity'), icon: IconStop },
      { title: t('monitor.quickOperation.pushFlowGasket'), icon: IconArrowRight }
    ]
    return () => (
      <Card>
        {quickOperationList.map((item) => (
          <Button long>
            {{
              icon: () => {
                return h(item.icon)
              },
              default: () => item.title
            }}
          </Button>
        ))}
      </Card>
    )
  }
})
