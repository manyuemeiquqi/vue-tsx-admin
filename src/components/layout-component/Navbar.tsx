import Logo from '@/assets/logo.svg'
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Input,
  Select,
  Space,
  Tooltip,
  Typography
} from '@arco-design/web-vue'
import {
  IconExport,
  IconFullscreen,
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
import useTheme from '@/hooks/theme'
import { isString } from 'lodash'
import { useApplicationStore } from '@/store'

export default defineComponent({
  setup() {
    const { isFullscreen, toggle: toggleFullScreen } = useFullscreen()
    const { currentLocale, changeLocale } = useLocale()
    const { t } = useI18n()
    const applicationStroe = useApplicationStore()

    const hanleLocaleChange = (val: unknown) => {
      if (isString(val)) {
        changeLocale(val)
      }
    }
    const setDropDownVisible = () => {}
    const setVisible = () => {}

    const handleLogout = () => {
      console.log('click')
    }
    const dOptionList = [
      {
        label: t('messageBox.switchRoles'),
        onClick: handleLogout,
        iconFn: () => <IconTag />
      },
      {
        label: t('messageBox.userCenter'),
        onClick: handleLogout,
        iconFn: () => <IconUser />
      },
      {
        label: t('messageBox.userSettings'),
        onClick: handleLogout,
        iconFn: () => <IconSettings />
      },
      {
        label: t('messageBox.logout'),
        onClick: handleLogout,
        iconFn: () => <IconExport />
      }
    ]
    const dropOptionsComponent = () =>
      dOptionList.map((item) => {
        return (
          <Dropdown.Option onClick={item.onClick}>
            <Space>
              {item.iconFn()}
              <span>{item.label}</span>
            </Space>
          </Dropdown.Option>
        )
      })
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
       pl-5
      "
      >
        <Space>
          <img src={Logo} alt="" />
          <Typography.Title heading={5}>Vtsx Pro</Typography.Title>
        </Space>
        <Space>
          <Input placeholder={t('navbar.search.placeholder')}></Input>
          <Select
            onChange={hanleLocaleChange}
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
                <Tooltip content={t('settings.language')}>
                  <Button
                    class=" !border-[rgb(var(--gray-2))] !text-[rgb(var(--gray-8))] !text-base"
                    type="outline"
                    shape="circle"
                    onClick={setVisible}
                  >
                    {{
                      icon: () => <IconLanguage />
                    }}
                  </Button>
                </Tooltip>
              )
            }}
          </Select>
          <Tooltip content={t('settings.title')}>
            <Button
              class=" !border-[rgb(var(--gray-2))] !text-[rgb(var(--gray-8))] !text-base"
              type="outline"
              shape="circle"
              onClick={applicationStroe.toggleDarkLightMode}
            >
              {{
                icon: () => {
                  return applicationStroe.isDark ? <IconMoonFill /> : <IconSunFill />
                }
              }}
            </Button>
          </Tooltip>
          <Tooltip content={t('settings.title')}>
            <Badge count={9} dot>
              <Button
                class=" !border-[rgb(var(--gray-2))] !text-[rgb(var(--gray-8))] !text-base"
                type="outline"
                shape="circle"
                onClick={setVisible}
              >
                {{
                  icon: () => <IconNotification />
                }}
              </Button>
            </Badge>
          </Tooltip>

          <Tooltip content={t('settings.title')}>
            <Button
              class=" !border-[rgb(var(--gray-2))] !text-[rgb(var(--gray-8))] !text-base"
              type="outline"
              shape="circle"
              onClick={toggleFullScreen}
            >
              {{
                icon: () => <IconFullscreen />
              }}
            </Button>
          </Tooltip>

          <Tooltip content={t('settings.title')}>
            <Button
              class=" !border-[rgb(var(--gray-2))] !text-[rgb(var(--gray-8))] !text-base"
              type="outline"
              shape="circle"
              onClick={setVisible}
            >
              {{
                icon: () => <IconSettings />
              }}
            </Button>
          </Tooltip>
          <Dropdown trigger="click">
            {{
              default: () => (
                <Avatar size={32} class={'cursor-pointer mr-2'}>
                  <img
                    alt="avatar"
                    src="https://avatars.githubusercontent.com/u/54520846?s=40&v=4"
                  />
                </Avatar>
              ),
              content: () => dropOptionsComponent()
            }}
          </Dropdown>
        </Space>
      </div>
    )
  }
})
