import { Avatar, Dropdown, Message, Space } from '@arco-design/web-vue'
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { IconExport, IconSettings, IconTag, IconUser } from '@arco-design/web-vue/es/icon'
import { AppRouteName } from '@/utils/routerHelper'
import { logout } from '@/api/user'
import { useApplicationStore, useUserStore } from '@/store'
import { clearToken } from '@/utils/auth'
import { removeRouteListener } from '@/utils/routerListener'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const { t } = useI18n()
    const userStore = useUserStore()
    const applicationStore = useApplicationStore()
    const router = useRouter()
    const handleLogout = async () => {
      /**
       * @desc logout callback
       */
      const afterLogout = () => {
        userStore.resetUserInfo()
        clearToken()
        removeRouteListener()
        applicationStore.clearServerMenu()
      }

      try {
        await logout()
        Message.success('登出成功')
        router.push({ name: AppRouteName.login })
      } finally {
        afterLogout()
      }
    }

    const switchRole = () => {
      userStore
        .switchRoles()
        .then((res) => {
          Message.success(res)
        })
        .catch(() => {
          Message.error('切换失败')
        })
    }
    const optionList = computed(() => [
      {
        label: t('messageBox.switchRoles'),
        onClick: switchRole,
        icon: <IconTag />
      },
      {
        label: t('messageBox.userCenter'),
        onClick: () => {
          router.push({ name: AppRouteName.userInfo })
        },
        icon: <IconUser />
      },
      {
        label: t('messageBox.userSettings'),
        onClick: () => {
          router.push({ name: AppRouteName.userSetting })
        },
        icon: <IconSettings />
      },
      {
        label: t('messageBox.logout'),
        onClick: handleLogout,
        icon: <IconExport />
      }
    ])
    return () => (
      <Dropdown trigger="click">
        {{
          default: () => (
            <Avatar size={32} class={['cursor-pointer', 'mr-2']}>
              <img
                alt="avatar"
                src="https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist54520846%20(1).jpg"
              />
            </Avatar>
          ),
          content: () => {
            return optionList.value.map((item) => (
              <Dropdown.Option onClick={item.onClick}>
                <Space>
                  {item.icon}
                  <span>{item.label}</span>
                </Space>
              </Dropdown.Option>
            ))
          }
        }}
      </Dropdown>
    )
  }
})
