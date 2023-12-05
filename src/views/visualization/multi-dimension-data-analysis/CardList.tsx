import ChartComponent from '@/components/chart-component'
import useChartOption from '@/hooks/chartOption'
import { Card, Space, Statistic, Typography } from '@arco-design/web-vue'
import { IconArrowFall, IconArrowRise } from '@arco-design/web-vue/es/icon'
import axios from 'axios'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const data: any[] = [
      { quota: 'retentionTrends', type: 'line' },
      { quota: 'userRetention', type: 'bar' },
      { quota: 'contentConsumptionTrends', type: 'line' },
      { quota: 'contentConsumption', type: 'bar' }
    ]
    const growth = ref()
    const count = ref()
    const { chartOption } = useChartOption(() => {
      return {
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        },
        xAxis: {
          type: 'category',
          show: false
        },
        yAxis: {
          show: false
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          formatter: '{c}'
        },
        series: [
          //   {
          //     data: chartData.value,
          //     ...(props.chartType === 'bar'
          //       ? {
          //           type: 'bar',
          //           barWidth: 7,
          //           barGap: '0'
          //         }
          //       : {
          //           type: 'line',
          //           showSymbol: false,
          //           smooth: true,
          //           lineStyle: {
          //             color: '#4080FF'
          //           }
          //         })
          //   }
        ]
      }
    })
    const fetchData = async () => {
      try {
        data.map(async (item) => {
          const resData = await axios.post<any>('/api/data-chain-growth', {
            quota: item.quota
          })
          console.log('data: ', resData)
          count.value = resData.data.count
          growth.value = resData.data.growth
        })
        // const { chartData: resChartData } = data

        // resChartData.data.value.forEach((el, idx) => {
        //   if (props.chartType === 'bar') {
        //     chartData.value.push({
        //       value: el,
        //       itemStyle: {
        //         color: idx % 2 ? '#468DFF' : '#86DF6C'
        //       }
        //     })
        //   } else {
        //     chartData.value.push(el)
        //   }
        // })
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        // setLoading(false)
      }
    }
    fetchData()
    return () => (
      <Space fill>
        {data.map((item) => (
          <Card>
            <Statistic></Statistic>
            <Typography.Text>
              <IconArrowRise />
              <IconArrowFall />
            </Typography.Text>
            {/* <ChartComponent /> */}
          </Card>
        ))}
      </Space>
    )
  }
})
