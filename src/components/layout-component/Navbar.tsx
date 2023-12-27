import Logo from '@/assets/logo.svg'
import useLocale from '@/hooks/locale'
import { useAppStore } from '@/store'
import { ApplicationInfo, LocaleOptions, layoutStyleConfig } from '@/types/constants'
import { Button, Input, Select, Space, Tooltip, Typography } from '@arco-design/web-vue'
import {
  IconFullscreen,
  IconFullscreenExit,
  IconLanguage,
  IconMoonFill,
  IconSettings,
  IconSunFill
} from '@arco-design/web-vue/es/icon'
import { useFullscreen } from '@vueuse/core'
import { isString } from 'lodash'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AvatarAndOptions from './AvatarAndOptions'
import styles from './style.module.scss'

export default defineComponent({
  name: 'Navbar',
  setup() {
    const { t } = useI18n()
    const { changeLocale } = useLocale()
    const appStore = useAppStore()
    const { isFullscreen, toggle: toggleFullScreen } = useFullscreen()

    const handleLocaleChange = (val: unknown) => {
      if (isString(val)) {
        changeLocale(val)
      }
    }
    const setVisible = () => {
      appStore.settingVisible = true
    }

    return () => (
      <div
        class={[styles.navbar]}
        style={{
          height: layoutStyleConfig.navbarHeight + 'px'
        }}
      >
        <div class={['hidden', 'md:block']}>
          <Space align="center">
            <img src={Logo} alt="logo" class={['w-8', 'h-8']} />
            <Typography.Title class={['!text-lg', '!m-0']} heading={5}>
              {ApplicationInfo.appTitle}
            </Typography.Title>
          </Space>
        </div>
        <Space>
          <Input class={['rounded-2xl']} placeholder={t('navbar.search.placeholder')}></Input>
          <Select
            onChange={handleLocaleChange}
            options={[
              { label: '中文', value: LocaleOptions.cn },
              { label: 'English', value: LocaleOptions.en }
            ]}
            triggerProps={{
              position: 'br',
              autoFitPopupMinWidth: true,
              trigger: 'hover',
              autoFitPopupWidth: true
            }}
          >
            {{
              trigger: () => (
                <Button class={[styles['nav-btn']]} type="outline" shape="circle">
                  {{
                    icon: () => <IconLanguage />
                  }}
                </Button>
              )
            }}
          </Select>
          <Tooltip
            content={
              appStore.isDark
                ? t('settings.navbar.theme.toLight')
                : t('settings.navbar.theme.toDark')
            }
          >
            <Button
              class={[styles['nav-btn']]}
              type="outline"
              shape="circle"
              onClick={appStore.toggleDarkLightMode}
            >
              {{
                icon: () => {
                  return appStore.isDark ? <IconMoonFill /> : <IconSunFill />
                }
              }}
            </Button>
          </Tooltip>
          <Tooltip
            content={
              isFullscreen.value
                ? t('settings.navbar.screen.toExit')
                : t('settings.navbar.screen.toFull')
            }
          >
            <Button
              class={[styles['nav-btn']]}
              type="outline"
              shape="circle"
              onClick={toggleFullScreen}
            >
              {{
                icon: () => (isFullscreen.value ? <IconFullscreenExit /> : <IconFullscreen />)
              }}
            </Button>
          </Tooltip>

          <Tooltip content={t('settings.title')}>
            <Button class={[styles['nav-btn']]} type="outline" shape="circle" onClick={setVisible}>
              {{
                icon: () => <IconSettings />
              }}
            </Button>
          </Tooltip>
          <AvatarAndOptions />
        </Space>
      </div>
    )
  }
})
