import { queryOperationLog, type operationLogRes } from '@/api/profile'
import useLoading from '@/hooks/loading'
import { Badge, Button, Card, Spin, Table } from '@arco-design/web-vue'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'DataUpdateRecord',
  setup() {
    const { t } = useI18n()
    const { loading, setLoading } = useLoading(true)
    const tableData = ref<operationLogRes>([])
    const fetchData = async () => {
      try {
        const { data } = await queryOperationLog()
        tableData.value = data
      } catch (err) {
        /* empty */
      } finally {
        setLoading(false)
      }
    }
    fetchData()

    return () => (
      <Card class="general-card" title={t('basicProfile.title.operationLog')}>
        <Spin loading={loading.value} class="w-full">
          <Table
            data={tableData.value}
            columns={[
              {
                dataIndex: 'contentNumber',
                title: t('basicProfile.column.contentNumber')
              },
              {
                dataIndex: 'updateContent',
                title: t('basicProfile.column.updateContent')
              },
              {
                dataIndex: 'status',
                title: t('basicProfile.column.status'),
                render: ({ record }) => {
                  if (record.status != 0) {
                    return <Badge status="success" text={t('basicProfile.cell.auditing')} />
                  }

                  return <Badge status="processing" text={t('basicProfile.cell.pass')} />
                }
              },
              {
                dataIndex: 'updateTime',
                title: t('basicProfile.column.updateTime')
              },
              {
                title: t('basicProfile.column.operation'),
                render() {
                  return <Button type="text">{t('basicProfile.cell.view')}</Button>
                }
              }
            ]}
          ></Table>
        </Spin>
      </Card>
    )
  }
})
