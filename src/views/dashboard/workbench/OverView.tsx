import ChartComponent from '@/components/chart-component'
import useChartOption from '@/hooks/chartOption'
import {
  Card,
  Space,
  Typography,
  Link,
  Divider,
  Grid,
  GridItem,
  Avatar,
  Statistic
} from '@arco-design/web-vue'
import { defineComponent, ref } from 'vue'

import { graphic } from 'echarts'
import axios from 'axios'
export default defineComponent({
  setup() {
    function graphicFactory(side: any) {
      return {
        type: 'text',
        bottom: '8',
        ...side,
        style: {
          text: '',
          textAlign: 'center',
          fill: '#4E5969',
          fontSize: 12
        }
      }
    }
    const xAxis = ref<string[]>([])
    const chartsData = ref<number[]>([])
    const graphicElements = ref([graphicFactory({ left: '2.6%' }), graphicFactory({ right: 0 })])
    const { chartOption } = useChartOption(() => {
      return {
        grid: {
          left: '2.6%',
          right: '0',
          top: '10',
          bottom: '30'
        },
        xAxis: {
          type: 'category',
          offset: 2,
          data: xAxis.value,
          boundaryGap: false,
          axisLabel: {
            color: '#4E5969',
            formatter(value: number, idx: number) {
              if (idx === 0) return ''
              if (idx === xAxis.value.length - 1) return ''
              return `${value}`
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            interval: (idx: number) => {
              if (idx === 0) return false
              if (idx === xAxis.value.length - 1) return false
              return true
            },
            lineStyle: {
              color: '#E5E8EF'
            }
          },
          axisPointer: {
            show: true,
            lineStyle: {
              color: '#23ADFF',
              width: 2
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          axisLabel: {
            formatter(value: any, idx: number) {
              if (idx === 0) return value
              return `${value}k`
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#E5E8EF'
            }
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter(params) {
            const [firstElement] = params as any[]
            return `<div>
                <p class="tooltip-title">${firstElement.axisValueLabel}</p>
                <div class="content-panel"><span>总内容量</span><span class="tooltip-value">${(
                  Number(firstElement.value) * 10000
                ).toLocaleString()}</span></div>
              </div>`
          },
          className: 'echarts-tooltip-diy'
        },
        graphic: {
          elements: graphicElements.value
        },
        series: [
          {
            data: chartsData.value,
            type: 'line',
            smooth: true,
            // symbol: 'circle',
            symbolSize: 12,
            emphasis: {
              focus: 'series',
              itemStyle: {
                borderWidth: 2
              }
            },
            lineStyle: {
              width: 3,
              color: new graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: 'rgba(30, 231, 255, 1)'
                },
                {
                  offset: 0.5,
                  color: 'rgba(36, 154, 255, 1)'
                },
                {
                  offset: 1,
                  color: 'rgba(111, 66, 251, 1)'
                }
              ])
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(17, 126, 255, 0.16)'
                },
                {
                  offset: 1,
                  color: 'rgba(17, 128, 255, 0)'
                }
              ])
            }
          }
        ]
      }
    })

    const fetchData = async () => {
      //   setLoading(true)
      try {
        let { data: chartData } = await axios.get<any[]>('/api/content-data')
        chartData = (chartData as any).data
        console.log('chartData: ', chartData)

        chartData.forEach((el: any, idx: number) => {
          xAxis.value.push(el.x)
          chartsData.value.push(el.y)
          if (idx === 0) {
            graphicElements.value[0].style.text = el.x
          }
          if (idx === chartData.length - 1) {
            graphicElements.value[1].style.text = el.x
          }
        })
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        // setLoading(false)
      }
    }
    fetchData()
    return () => (
      <Card>
        <Typography.Title heading={5}></Typography.Title>
        <Divider />

        <div>
          <Typography.Paragraph>
            内容数据
            <span>（近一年）</span>
          </Typography.Paragraph>
          <Link>查看更多</Link>
          <Grid>
            <Grid.Item>
              <Space>
                <Avatar></Avatar>
                <Statistic></Statistic>
              </Space>
            </Grid.Item>
            <Grid.Item>
              <Divider />
            </Grid.Item>
          </Grid>
          <ChartComponent options={chartOption.value} />
        </div>
      </Card>
    )
  }
})
