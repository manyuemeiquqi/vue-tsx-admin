import { Card, Table } from '@arco-design/web-vue'
import axios from 'axios'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  setup() {
    const { t } = useI18n()
    const columns = [
      {
        title: t('dataAnalysis.authorTable.rank'),
        dataIndex: 'id'
      },
      {
        title: t('dataAnalysis.authorTable.author'),
        dataIndex: 'author'
      },
      {
        title: t('dataAnalysis.authorTable.content'),
        dataIndex: 'contentCount',

        render(x: any) {
          return Number(x).toLocaleString()
        }
      },
      {
        title: t('dataAnalysis.authorTable.click'),
        dataIndex: 'clickCount',

        render(x: any) {
          return Number(x).toLocaleString()
        }
      }
    ]

    const tableData = ref<any>({ list: [] })
    const fetchData = async () => {
      try {
        // setLoading(true)
        const { data } = await axios.get<any>('/api/popular-author/list')
        console.log('data: ', data)
        tableData.value.list = data.list
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        // setLoading(false)
      }
    }
    fetchData()
    return () => (
      <Card>
        <Table columns={columns} data={tableData.value.list}></Table>
      </Card>
    )
  }
})
