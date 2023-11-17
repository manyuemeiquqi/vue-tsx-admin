import { Card, Divider, Typography, Link } from '@arco-design/web-vue'
import { defineComponent, ref } from 'vue'

import { graphic } from 'echarts'
import useChartOption from '@/hooks/chartOption'
import Chart from '@/components/chart-component/index'
import { type AnyObject } from '@/types/global'
import axios from 'axios'
export default defineComponent({
  setup() {
    function graphicFactory(side: AnyObject) {
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
    const tooltipItemsHtmlString = (items: any[]) => {
      return items
        .map(
          (el) => `<div class="content-panel">
          <p>
            <span style="background-color: ${el.color}" class="tooltip-item-icon"></span><span>${
              el.seriesName
            }</span>
          </p>
          <span class="tooltip-value">${el.value.toLocaleString()}</span>
        </div>`
        )
        .reverse()
        .join('')
    }
    const generateSeries = (
      name: string,
      lineColor: string,
      itemBorderColor: string,
      data: number[]
    ): any => {
      return {
        name,
        data,
        stack: 'Total',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 10,
        itemStyle: {
          color: lineColor
        },
        emphasis: {
          focus: 'series',
          itemStyle: {
            color: lineColor,
            borderWidth: 2,
            borderColor: itemBorderColor
          }
        },
        lineStyle: {
          width: 2,
          color: lineColor
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.1,
          color: lineColor
        }
      }
    }
    const chartsData = ref<number[]>([])
    const { chartOption } = useChartOption(() => {
      return {
        grid: {
          left: '2.6%',
          right: '4',
          top: '40',
          bottom: '40'
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
            show: false
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
            formatter(value: number, idx: number) {
              if (idx === 0) return String(value)
              return `${value / 1000}k`
            }
          },
          splitLine: {
            lineStyle: {
              // color: dark ? '#2E2E30' : '#F2F3F5'
              color: '#F2F3F5'
            }
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter(params) {
            // const [firstElement] = params as ToolTipFormatterParams[]
            const [firstElement] = params as any[]
            return `<div>
              <p class="tooltip-title">${firstElement.axisValueLabel}</p>
              ${tooltipItemsHtmlString(params as any[])}
            </div>`
          },
          className: 'echarts-tooltip-diy'
        },
        graphic: {
          elements: [
            {
              type: 'text',
              left: '2.6%',
              bottom: '18',
              style: {
                text: '12.10',
                textAlign: 'center',
                fill: '#4E5969',
                fontSize: 12
              }
            },
            {
              type: 'text',
              right: '0',
              bottom: '18',
              style: {
                text: '12.17',
                textAlign: 'center',
                fill: '#4E5969',
                fontSize: 12
              }
            }
          ]
        },
        series: [
          generateSeries('内容生产量', '#722ED1', '#F5E8FF', contentProductionData.value),
          generateSeries('内容点击量', '#F77234', '#FFE4BA', contentClickData.value),
          generateSeries('内容曝光量', '#33D1C9', '#E8FFFB', contentExposureData.value),
          generateSeries('活跃用户数', '#3469FF', '#E8F3FF', activeUsersData.value)
        ]
      }
    })

    const graphicElements = ref([graphicFactory({ left: '2.6%' }), graphicFactory({ right: 0 })])

    const contentProductionData = ref<number[]>([])

    const contentClickData = ref<number[]>([])
    const contentExposureData = ref<number[]>([])
    const activeUsersData = ref<number[]>([])
    const fetchData = async () => {
      try {
        const data = (await axios.post('/api/data-overview')).data.data
        console.log('data: ', data)
        xAxis.value = data.xAxis
        console.log('xAxis: ', xAxis)
        data.data.forEach((el: any) => {
          if (el.name === '内容生产量') {
            contentProductionData.value = el.value
          } else if (el.name === '内容点击量') {
            contentClickData.value = el.value
          } else if (el.name === '内容曝光量') {
            contentExposureData.value = el.value
          }
          activeUsersData.value = el.value
        })
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        console.log()
      }
    }
    fetchData()
    return () => (
      <Card>
        <Typography.Title heading={5}>欢迎回来</Typography.Title>
        <Divider />

        <div>
          <Typography.Paragraph>
            内容数据
            <span>（近一年）</span>
          </Typography.Paragraph>
          <Link>查看更多</Link>
          <Chart height="289px" options={chartOption.value}></Chart>
        </div>
      </Card>
    )
  }
})
