import { useUserStore } from '@/store'
import { Link, List, Typography } from '@arco-design/web-vue'
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import styles from './style.module.scss'
export default defineComponent({
  name: 'SecuritySettings',
  setup() {
    const { t } = useI18n()
    const userStore = useUserStore()
    const settingList = computed(() => [
      {
        title: t('userSetting.security.password'),
        value: t('userSetting.security.password.tips')
      },
      {
        title: t('userSetting.security.question'),
        value: '',
        placeholder: t('userSetting.security.question.placeholder')
      },
      {
        title: t('userSetting.security.phone'),
        value: userStore.phone ? `${t('userSetting.security.phone.tips')} ${userStore.phone}` : ''
      },
      {
        title: t('userSetting.security.email'),
        value: '',
        placeholder: t('userSetting.security.email.placeholder')
      }
    ])

    return () => (
      <div>
        <List split={false} bordered={false}>
          {settingList.value.map((item) => (
            <List.Item>
              <List.Item.Meta class={[styles['list-item']]}>
                {{
                  avatar: () => <Typography.Paragraph>{item.title}</Typography.Paragraph>,
                  description: () => (
                    <>
                      <Typography.Paragraph class={[!item.value && 'text-[rgb(var(--gray-6))]']}>
                        {item.value ? item.value : item.placeholder}
                      </Typography.Paragraph>
                      <Typography.Paragraph>
                        {item.value ? (
                          <Link>{t('userSetting.SecuritySettings.button.update')}</Link>
                        ) : (
                          <Link>{t('userSetting.SecuritySettings.button.settings')}</Link>
                        )}
                      </Typography.Paragraph>
                    </>
                  )
                }}
              </List.Item.Meta>
            </List.Item>
          ))}
        </List>
      </div>
    )
  }
})
