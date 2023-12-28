import useAuth from '@/hooks/auth'
import { useUserStore } from '@/store'
import { ViewNames } from '@/types/constants'
import { Avatar, Dropdown, Message, Space } from '@arco-design/web-vue'
import { IconExport, IconSettings, IconTag, IconUser } from '@arco-design/web-vue/es/icon'
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'AvatarAndOptions',
  setup() {
    const { t } = useI18n()
    const userStore = useUserStore()
    const { logoutApp } = useAuth()
    const router = useRouter()
    const handleLogout = async () => {
      try {
        await logoutApp()
        Message.success('登出成功')
        router.push({ name: ViewNames.login })
      } finally {
        /* empty */
      }
    }

    const switchRole = () => {
      userStore
        .switchRoles()
        .then((res) => {
          if (res) Message.success(res)
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
          router.push({ name: ViewNames.info })
        },
        icon: <IconUser />
      },
      {
        label: t('messageBox.userSettings'),
        onClick: () => {
          router.push({ name: ViewNames.setting })
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
