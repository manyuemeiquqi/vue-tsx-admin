import { Button, Card, Divider, Grid, Link, Space, Typography } from '@arco-design/web-vue'
import {
  IconFile,
  IconFire,
  IconMobile,
  IconSettings,
  IconStorage
} from '@arco-design/web-vue/es/icon'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import styles from './style.module.scss'
export default defineComponent({
  setup() {
    const { t } = useI18n()
    const links = [
      { text: 'workplace.contentManagement', icon: <IconFile /> },
      { text: 'workplace.contentStatistical', icon: <IconStorage /> },
      { text: 'workplace.advanced', icon: <IconSettings /> },
      { text: 'workplace.onlinePromotion', icon: <IconMobile /> },
      { text: 'workplace.contentPutIn', icon: <IconFire /> }
    ]
    const quickLinks = [
      {
        text: 'workplace.contentManagement',
        icon: <IconStorage />
      },
      {
        text: 'workplace.contentStatistical',
        icon: <IconFile />
      },
      {
        text: 'workplace.advanced',
        icon: <IconSettings />
      }
    ]
    return () => (
      <Card class="general-card">
        <Card
          class="general-card"
          v-slots={{
            extra() {
              return <Link>{t('workplace.quickOperation.setup')}</Link>
            }
          }}
          title={t('workplace.quick.operation')}
        >
          <Grid.Row gutter={16}>
            {links.map((item) => (
              <Grid.Col span={8}>
                <Space class={[styles.wrapper]} align="center" direction="vertical" size="small">
                  <div class={[styles.icon]}>{item.icon}</div>
                  <Typography.Paragraph class={[styles.text]}>{t(item.text)}</Typography.Paragraph>
                </Space>
              </Grid.Col>
            ))}
          </Grid.Row>
        </Card>
        <Divider margin={0} />
        <Card class="general-card" title={t('workplace.recently.visited')}>
          <Grid.Row gutter={16}>
            {quickLinks.map((item) => (
              <Grid.Col span={8}>
                <Space class={[styles.wrapper]} align="center" direction="vertical" size="small">
                  <div class={[styles.icon]}>{item.icon}</div>
                  <Typography.Paragraph class={[styles.text]}>{t(item.text)}</Typography.Paragraph>
                </Space>
              </Grid.Col>
            ))}
          </Grid.Row>
        </Card>
      </Card>
    )
  }
})
