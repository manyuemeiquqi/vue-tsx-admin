import Logo from '@/assets/logo.svg'
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Input,
  Message,
  Select,
  Space,
  Tooltip,
  Typography
} from '@arco-design/web-vue'
import {
  IconExport,
  IconFullscreen,
  IconFullscreenExit,
  IconLanguage,
  IconMoonFill,
  IconNotification,
  IconSettings,
  IconSunFill,
  IconTag,
  IconUser
} from '@arco-design/web-vue/es/icon'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

import { useFullscreen } from '@vueuse/core'
import { LocaleOptions } from '@/types/enum'
import useLocale from '@/hooks/locale'
import { isFunction, isString } from 'lodash'
import { useApplicationStore, useUserStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { logout } from '@/api/user'
import { removeRouteListener } from '@/utils/routerListener'
import { clearToken } from '@/utils/auth'
import { AppRouteName } from '@/utils/routerHelper'

import styles from './style.module.scss'
import AvatarAndOptions from './AvatarAndOptions'
import NotificationComponent from './NotificationComponent'

export default defineComponent({
  setup() {
    const route = useRoute()
    const { isFullscreen, toggle: toggleFullScreen } = useFullscreen()
    const { currentLocale, changeLocale } = useLocale()
    const { t } = useI18n()
    const applicationStore = useApplicationStore()
    const userStore = useUserStore()
    const router = useRouter()

    const handleLocaleChange = (val: unknown) => {
      if (isString(val)) {
        changeLocale(val)
      }
    }
    const setDropDownVisible = () => {}
    const setVisible = () => {
      applicationStore.updateSettings({ globalSettings: true })
    }

    return () => (
      <div
        style={{
          borderBottom: '1px solid var(--color-border)'
        }}
        class="flex  w-full fixed h-16 justify-between
         items-center
       top-0
     left-0 z-[100]
     bg-[color:var(--color-bg-2)]
       pl-5  box-border
      "
      >
        <Space align="center">
          <img src={Logo} alt="logo" />
          <Typography.Title heading={5}>Vue TSX Admin</Typography.Title>
        </Space>
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
              trigger: 'click',
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
              applicationStore.isDark
                ? t('settings.navbar.theme.toLight')
                : t('settings.navbar.theme.toDark')
            }
          >
            <Button
              class={[styles['nav-btn']]}
              type="outline"
              shape="circle"
              onClick={applicationStore.toggleDarkLightMode}
            >
              {{
                icon: () => {
                  return applicationStore.isDark ? <IconMoonFill /> : <IconSunFill />
                }
              }}
            </Button>
          </Tooltip>
          <NotificationComponent />
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
