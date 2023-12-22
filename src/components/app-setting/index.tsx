import {
  Divider,
  Drawer,
  Grid,
  InputNumber,
  Switch,
  Trigger,
  Typography
} from '@arco-design/web-vue'
import { computed, defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Sketch } from '@ckpack/vue-color'
import { useApplicationStore } from '@/store'

import { generate, getRgbStr } from '@arco-design/color'
export default defineComponent({
  setup() {
    const { t } = useI18n()

    const applicationStore = useApplicationStore()
    const handleCancel = () => {}
    const handleOK = () => {}
    const colorList = computed(() => generate(applicationStore.themeColor, { list: true }))
    return () => (
      <Drawer
        width={300}
        cancelText={t('settings.close')}
        okText={t('settings.copySettings')}
        onOk={handleOK}
        onCancel={handleCancel}
        unmountOnClose
        visible={true}
      >
        {{
          title() {
            return t('settings.title')
          },
          default() {
            return (
              <>
                <Typography.Title heading={5}>{t('settings.themeColor')}</Typography.Title>
                <Trigger trigger="hover" position="bl">
                  {{
                    default() {
                      return (
                        <div
                          class={[
                            'flex',
                            'w-full',
                            'h-8',
                            'border',
                            'border-[color:var(--color-border)]',
                            'box-border',
                            'p-[3px]',
                            'border-solid'
                          ]}
                        >
                          <div
                            class={['w-24', 'h-6', 'mr-2']}
                            style={{ backgroundColor: applicationStore.themeColor }}
                          />
                          <span>{applicationStore.themeColor}</span>
                        </div>
                      )
                    },
                    content() {
                      return <Sketch v-model={applicationStore.themeColor} />
                    }
                  }}
                </Trigger>

                <ul class={['flex', 'list-none', 'p-0']}>
                  {colorList.value.map((item: any, index: string) => (
                    <li key={index} class={['w-[10%]', 'h-6']} style={{ backgroundColor: item }} />
                  ))}
                </ul>
                <Divider />
                <Typography.Title heading={5}>{t('settings.content')}</Typography.Title>
                <Grid.Row justify="space-between">
                  <span>{t('settings.navbar')}</span>
                  <Switch v-model={applicationStore.navbar} />
                </Grid.Row>
                <Grid.Row justify="space-between">
                  <span>{t('settings.menu')}</span>
                  <Switch v-model={applicationStore.menu} />
                </Grid.Row>
                <Grid.Row justify="space-between">
                  <span>{t('settings.menuFromServer')}</span>
                  <Switch v-model={applicationStore.menuFromServer} />
                </Grid.Row>
                <Grid.Row justify="space-between">
                  <span>{t('settings.menuWidth')}</span>
                  <InputNumber v-model={applicationStore.menuWidth} />
                </Grid.Row>

                <Divider />
                <Typography.Title heading={5}>{t('settings.otherSettings')}</Typography.Title>

                <Grid.Row justify="space-between">
                  <span>{t('settings.colorWeak')}</span>
                  <Switch v-model={applicationStore.colorWeak} />
                </Grid.Row>
              </>
            )
          }
        }}
      </Drawer>
    )
  }
})
