import { Card, Link, Space, Tag, Typography } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Announcement',
  setup() {
    const { t } = useI18n()
    const list = [
      {
        type: 'orangered',
        label: '活动',
        content: '内容最新优惠活动'
      },
      {
        type: 'cyan',
        label: '消息',
        content: '新增内容尚未通过审核，详情请点击查看。'
      },
      {
        type: 'blue',
        label: '通知',
        content: '当前产品试用期即将结束，如需续费请点击查看。'
      },
      {
        type: 'blue',
        label: '通知',
        content: '1月新系统升级计划通知'
      },
      {
        type: 'cyan',
        label: '消息',
        content: '新增内容已经通过审核，详情请点击查看。'
      }
    ]

    return () => (
      <Card class="general-card" title={t('workplace.announcement')}>
        {{
          extra: () => <Link>{t('workplace.viewMore')}</Link>,
          default: () => (
            <Space size="small" direction="vertical">
              {list.map((item) => (
                <div class="flex  items-baseline">
                  <Tag size="small" color={item.type}>
                    {item.label}
                  </Tag>
                  <Typography.Text
                    class={['flex-1', 'text-xs', 'ml-1', 'text-[color:var(--color-text-2)]']}
                  >
                    {item.content}
                  </Typography.Text>
                </div>
              ))}
            </Space>
          )
        }}
      </Card>
    )
  }
})
