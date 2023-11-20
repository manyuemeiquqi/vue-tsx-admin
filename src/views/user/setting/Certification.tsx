import { Card, Descriptions, Link, Table, Badge, Button, Space } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const columns = [
      { title: t('userSetting.verified.authType'), dataIndex: 'authType' },
      {
        title: t('userSetting.verified.authContent'),
        dataIndex: 'authContent'
      },
      {
        title: t('userSetting.verified.authStatus'),
        dataIndex: 'authStatus',
        render(x: any) {
          return x ? (
            <Badge status="success" text={t('userSetting.verified.status.success')}></Badge>
          ) : (
            <span>
              <Badge status="processing" text={t('userSetting.verified.status.waiting')}></Badge>
            </span>
          )
        }
      },
      {
        title: t('userSetting.verified.createdTime'),
        dataIndex: 'createdTime'
      },
      {
        title: t('userSetting.verified.operation'),
        headerCellStyle: { paddingLeft: '15px' },
        render: ({ column }: any) => {
          if (column.authStatus) {
            return <Button type="text">{t('userSetting.verified.operation.view')}</Button>
          }
          return (
            <Space>
              <Button type="text">{t('userSetting.verified.operation.view')}</Button>
              <Button type="text">{t('userSetting.verified.operation.revoke')}</Button>
            </Space>
          )
        }
      }
    ]
    return () => (
      <div>
        <Card>
          {{
            default: () => <Descriptions></Descriptions>,
            extra: () => <Link></Link>
          }}
        </Card>
        <Card>
          <Table columns={columns}></Table>
        </Card>
      </div>
    )
  }
})
