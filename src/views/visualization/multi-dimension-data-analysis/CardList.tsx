import { queryDataChainGrowth } from '@/api/visualization'
import ChartComponent from '@/components/chart-component'
import useChartOption from '@/hooks/chartOption'
import { Card, Grid, Space, Statistic, Typography } from '@arco-design/web-vue'
import { IconArrowFall, IconArrowRise } from '@arco-design/web-vue/es/icon'
import axios from 'axios'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const data = ref<any[]>([
      { quota: 'retentionTrends', chartType: 'line' },
      { quota: 'userRetention', chartType: 'bar' },
      { quota: 'contentConsumptionTrends', chartType: 'line' },
      { quota: 'contentConsumption', chartType: 'bar' }
    ])
    const fetchData = async () => {
      try {
        data.value.map(async (item) => {
          const { data: resData } = await queryDataChainGrowth({
            quota: item.quota
          })

          console.log('resData: ', resData)
          const dataList: { value: any; itemStyle: { color: string } }[] = []
          resData.chartData.data.value.forEach((el: any, idx: number) => {
            if (item.chartType === 'bar') {
              dataList.push({
                value: el,
                itemStyle: {
                  color: idx % 2 ? '#468DFF' : '#86DF6C'
                }
              })
            } else {
              dataList.push(el)
            }
          })
          item.count = resData.count
          item.growth = resData.growth
          console.log('dataList: ', dataList)

          item.chartOption = useChartOption(() => {
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
                {
                  data: dataList,
                  ...(item.chartType === 'bar'
                    ? {
                        type: 'bar',
                        barWidth: 7,
                        barGap: '0'
                      }
                    : {
                        type: 'line',
                        showSymbol: false,
                        smooth: true,
                        lineStyle: {
                          color: '#4080FF'
                        }
                      })
                }
              ]
            }
          }).chartOption
        })
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        // setLoading(false)
      }
    }
    fetchData()
    return () => (
      <Grid.Row gutter={16}>
        {data.value.map((item) => (
          <Grid.Col span={6}>
            <Card class="general-card" title={item.title}>
              <Statistic showGroupSeparator animation value={item.count} valueFrom={0}></Statistic>
              <Typography.Text>
                {item.growth}%
                <IconArrowRise />
                <IconArrowFall />
              </Typography.Text>
              {item.chartOption && <ChartComponent options={item.chartOption} height="80px" />}
            </Card>
          </Grid.Col>
        ))}
      </Grid.Row>
    )
  }
})
