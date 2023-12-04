import ChartComponent from '@/components/chart-component'
import useChartOption from '@/hooks/chartOption'
import { Card, Space, Statistic } from '@arco-design/web-vue'
import axios from 'axios'
import { computed, defineComponent, ref, h } from 'vue'
import { useI18n } from 'vue-i18n'
import ChainItem from './ChainItem'
export default defineComponent({
  setup() {
    const { t } = useI18n()
    const isDark = ref(false)
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
    const renderData = computed(() => [
      {
        title: t('dataAnalysis.card.title.allVisitors'),
        quota: 'visitors',

        chartType: 'line'
      },
      {
        title: t('dataAnalysis.card.title.contentPublished'),
        quota: 'published',

        chartType: 'bar'
      },
      {
        title: t('dataAnalysis.card.title.totalComment'),
        quota: 'comment',

        chartType: 'line'
      },
      {
        title: t('dataAnalysis.card.title.totalShare'),
        quota: 'share',

        chartType: 'pie'
      }
    ])
    const xAxis = ref<string[]>([])
    const contentProductionData = ref<number[]>([])
    const contentClickData = ref<number[]>([])
    const contentExposureData = ref<number[]>([])
    const activeUsersData = ref<number[]>([])
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
    const { chartOption } = useChartOption((dark) => {
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
              color: dark ? '#2E2E30' : '#F2F3F5'
            }
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter(params) {
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
    const fetchData = async () => {
      //   setLoading(true)
      try {
        const { data } = await axios.post<any>('/api/data-overview')
        xAxis.value = data.xAxis
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
        // setLoading(false)
      }
    }
    fetchData()

    return () => (
      <Card>
        <Space>
          {renderData.value.map((item) => (
            <ChainItem title={item.title} quota={item.quota} chartType={item.chartType} />
          ))}
        </Space>
      </Card>
    )
  }
})
