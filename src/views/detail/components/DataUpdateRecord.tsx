import { queryOperationLog, type operationLogRes } from '@/api/detail'
import useLoading from '@/hooks/loading'
import { Card, Table, Badge, Button, Spin } from '@arco-design/web-vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const { loading, setLoading } = useLoading(true)
    const tableData = ref<operationLogRes>([])
    const fetchData = async () => {
      try {
        const { data } = await queryOperationLog()
        console.log('data: ', data)
        // 先暂时这么写
        tableData.value = (data as unknown as any).data as unknown as operationLogRes
        console.log('tableData.value : ', tableData.value)
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        setLoading(false)
      }
    }
    fetchData()

    return () => (
      <Card title="参数调整记录">
        <Spin loading={loading.value}>
          <Table
            data={tableData.value}
            columns={[
              {
                dataIndex: 'contentNumber',
                title: '内容编号'
              },
              {
                dataIndex: 'updateContent',
                title: '调整内容'
              },
              {
                dataIndex: 'status',
                title: '当前状态',
                render: (status) => {
                  if (status) {
                    return <Badge status="success" text={'审核中'} />
                  }

                  return <Badge status="processing" text={'已通过'} />
                }
              },
              {
                dataIndex: 'updateTime',
                title: '修改时间'
              },
              {
                title: '操作',
                headerCellStyle: { paddingLeft: '15px' },
                render() {
                  return <Button type="text">{'查看'}</Button>
                }
              }
            ]}
          ></Table>
        </Spin>
      </Card>
    )
  }
})
