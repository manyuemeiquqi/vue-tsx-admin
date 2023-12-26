import { useAppStore } from '@/store'
import {
  Button,
  Divider,
  Drawer,
  Grid,
  InputNumber,
  Message,
  Space,
  Switch,
  Trigger,
  Typography
} from '@arco-design/web-vue'
import { Sketch } from '@ckpack/vue-color'
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { generate } from '@arco-design/color'
import { IconSettings } from '@arco-design/web-vue/es/icon'

export default defineComponent({
  name: 'AppSetting',
  setup() {
    const { t } = useI18n()
    const appStore = useAppStore()
    const handleCancel = () => {
      appStore.settingVisible = false
    }
    const handleOK = () => {
      appStore.resetSetting()
      Message.success('重置成功')
      appStore.settingVisible = false
    }
    const handleChangeThemeColor = (val: any) => {
      appStore.themeColor = val.hex
    }
    const colorList = computed(() => generate(appStore.themeColor, { list: true }))

    return () => (
      <>
        {!appStore.navbar && (
          <div class={['fixed', 'top-72', 'right-0']}>
            <Button type="primary" onClick={() => (appStore.settingVisible = true)}>
              {{
                icon() {
                  return <IconSettings />
                }
              }}
            </Button>
          </div>
        )}
        <Drawer
          v-model:visible={appStore.settingVisible}
          width={300}
          cancelText={t('settings.close')}
          okText={t('settings.resetSettings')}
          onOk={handleOK}
          onCancel={handleCancel}
          unmountOnClose
        >
          {{
            title() {
              return t('settings.title')
            },
            default() {
              return (
                <>
                  <Typography.Title class="!font-semibold" heading={6}>
                    {t('settings.themeColor')}
                  </Typography.Title>
                  <Trigger trigger="hover" position="bl">
                    {{
                      default() {
                        return (
                          <>
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
                                style={{ backgroundColor: appStore.themeColor }}
                              />
                              <span>{appStore.themeColor}</span>
                            </div>
                          </>
                        )
                      },
                      content() {
                        return (
                          <>
                            <Sketch
                              modelValue={appStore.themeColor}
                              onUpdate:modelValue={handleChangeThemeColor}
                            />
                          </>
                        )
                      }
                    }}
                  </Trigger>

                  <ul class={['flex', 'list-none', 'p-0']}>
                    {colorList.value.map((item: any, index: string) => (
                      <li
                        key={index}
                        class={['w-[10%]', 'h-6']}
                        style={{ backgroundColor: item }}
                      />
                    ))}
                  </ul>
                  <span>根据主题颜色生成的 10 个梯度色</span>

                  <Divider />
                  <Typography.Title class="!font-semibold" heading={6}>
                    {t('settings.content')}
                  </Typography.Title>
                  <Space fill direction="vertical">
                    <Grid.Row justify="space-between">
                      <span>{t('settings.navbar')}</span>
                      <Switch size="small" v-model={appStore.navbar} />
                    </Grid.Row>
                    <Grid.Row justify="space-between">
                      <span>{t('settings.menu')}</span>
                      <Switch size="small" v-model={appStore.menu} />
                    </Grid.Row>

                    <Grid.Row justify="space-between">
                      <span>{t('settings.menuWidth')}</span>
                      <InputNumber size="mini" class="w-20" v-model={appStore.menuWidth} />
                    </Grid.Row>
                  </Space>
                  <Divider />
                  <Typography.Title class="!font-semibold" heading={6}>
                    {t('settings.otherSettings')}
                  </Typography.Title>

                  <Grid.Row justify="space-between">
                    <span>{t('settings.colorWeak')}</span>
                    <Switch size="small" v-model={appStore.colorWeak} />
                  </Grid.Row>
                </>
              )
            }
          }}
        </Drawer>
      </>
    )
  }
})
