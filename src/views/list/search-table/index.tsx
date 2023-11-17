import { Button, Card, Table, Typography, Badge } from '@arco-design/web-vue'
import { defineComponent } from 'vue'

export function getColumns(
  t: any,
  callback: (record: Record<string, any>, type: string) => Promise<void>
) {
  return [
    {
      title: t('searchTable.columns.id'),
      dataIndex: 'id',
      render: (value) => <Typography>{value}</Typography>
    },
    {
      title: t('searchTable.columns.name'),
      dataIndex: 'name'
    },
    {
      title: t('searchTable.columns.contentType'),
      dataIndex: 'contentType',
      render: (value) => (
        <div class={styles['content-type']}>
          {ContentIcon[value]}
          {ContentType[value]}
        </div>
      )
    },
    {
      title: t('searchTable.columns.filterType'),
      dataIndex: 'filterType',
      render: (value) => FilterType[value]
    },
    {
      title: t('searchTable.columns.contentNum'),
      dataIndex: 'count',
      sorter: (a, b) => a.count - b.count,
      render(x) {
        return Number(x).toLocaleString()
      }
    },
    {
      title: t('searchTable.columns.createdTime'),
      dataIndex: 'createdTime',
      render: (x) => dayjs().subtract(x, 'days').format('YYYY-MM-DD HH:mm:ss'),
      sorter: (a, b) => b.createdTime - a.createdTime
    },
    {
      title: t('searchTable.columns.status'),
      dataIndex: 'status',
      render: (x) => {
        if (x === 0) {
          return <Badge status="error" text={Status[x]}></Badge>
        }
        return <Badge status="success" text={Status[x]}></Badge>
      }
    },
    {
      title: t('searchTable.columns.operations'),
      dataIndex: 'operations',
      headerCellStyle: { paddingLeft: '15px' },
      render: (_, record) => (
        <Button type="text" size="small" onClick={() => callback(record, 'view')}>
          {t('searchTable.columns.operations.view')}
        </Button>
      )
    }
  ]
}
export default defineComponent({
  setup() {
    return () => (
      <Card>
        <Typography.Title heading={6}>121</Typography.Title>
        <Table columns={}></Table>
      </Card>
    )
  }
})
