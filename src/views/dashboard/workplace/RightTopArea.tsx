import { Card, Divider, Grid, Link, Space, Typography } from '@arco-design/web-vue'
import {
  IconFile,
  IconFire,
  IconMobile,
  IconSettings,
  IconStorage
} from '@arco-design/web-vue/es/icon'
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import styles from './style.module.scss'

export default defineComponent({
  name: 'RightTopArea',
  setup() {
    const { t } = useI18n()
    const links = computed(() => [
      { text: t('workplace.contentManagement'), icon: <IconFile /> },
      { text: t('workplace.contentStatistical'), icon: <IconStorage /> },
      { text: t('workplace.advanced'), icon: <IconSettings /> },
      { text: t('workplace.onlinePromotion'), icon: <IconMobile /> },
      { text: t('workplace.contentPutIn'), icon: <IconFire /> }
    ])
    const quickLinks = computed(() => [
      {
        text: t('workplace.contentManagement'),
        icon: <IconStorage />
      },
      {
        text: t('workplace.contentStatistical'),
        icon: <IconFile />
      },
      {
        text: t('workplace.advanced'),
        icon: <IconSettings />
      }
    ])
    return () => (
      <Card class="general-card">
        <Card
          class={['general-card', styles.area]}
          v-slots={{
            extra() {
              return <Link>{t('workplace.quickOperation.setup')}</Link>
            }
          }}
          title={t('workplace.quick.operation')}
        >
          <Grid.Row gutter={16}>
            {links.value.map((item) => (
              <Grid.Col span={8}>
                <Space class={[styles.wrapper]} align="center" direction="vertical" size="small">
                  <div class={[styles.icon]}>{item.icon}</div>
                  <Typography.Paragraph class={[styles.text]}>{item.text}</Typography.Paragraph>
                </Space>
              </Grid.Col>
            ))}
          </Grid.Row>
        </Card>
        <Divider margin={0} />
        <Card class={['general-card', styles.area]} title={t('workplace.recently.visited')}>
          <Grid.Row gutter={16}>
            {quickLinks.value.map((item) => (
              <Grid.Col span={8}>
                <Space class={[styles.wrapper]} align="center" direction="vertical" size="small">
                  <div class={[styles.icon]}>{item.icon}</div>
                  <Typography.Paragraph class={[styles.text]}>{item.text}</Typography.Paragraph>
                </Space>
              </Grid.Col>
            ))}
          </Grid.Row>
        </Card>
      </Card>
    )
  }
})
