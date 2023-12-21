import { Drawer, InputNumber, Switch } from '@arco-design/web-vue'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Sketch } from '@ckpack/vue-color'
export default defineComponent({
  setup() {
    const { t } = useI18n()

    const colors = ref('#194D33A8')
    return () => (
      <Drawer unmountOnClose>
        {{
          title() {
            return t('settings.title')
          },
          default() {
            return (
              <>
                <Sketch v-model={colors.value} />
                <InputNumber />
                <Switch></Switch>
              </>
            )
          }
        }}
      </Drawer>
    )
  }
})
