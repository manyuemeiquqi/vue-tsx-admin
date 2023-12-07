import { queryContentPublish } from '@/api/visualization'
import ChartComponent from '@/components/chart-component'
import useChartOption from '@/hooks/chartOption'
import { Card, Spin } from '@arco-design/web-vue'
import axios from 'axios'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  setup() {
    const tooltipItemsHtmlString = (items: any[]) => {
      return items
        .map(
          (el) => `<div class="content-panel">
        <p>
          <span style="background-color: ${el.color}" class="tooltip-item-icon"></span>
          <span>
          ${el.seriesName}
          </span>
        </p>
        <span class="tooltip-value">
          ${Number(el.value).toLocaleString()}
        </span>
      </div>`
        )
        .join('')
    }
    const xAxis = ref<string[]>([])
    const textChartsData = ref<number[]>([])
    const imgChartsData = ref<number[]>([])
    const videoChartsData = ref<number[]>([])
    const { chartOption } = useChartOption((isDark) => {
      return {
        grid: {
          left: '4%',
          right: 0,
          top: '20',
          bottom: '60'
        },
        legend: {
          bottom: 0,
          icon: 'circle',
          textStyle: {
            color: '#4E5969'
          }
        },
        xAxis: {
          type: 'category',
          data: xAxis.value,
          axisLine: {
            lineStyle: {
              color: isDark ? '#3f3f3f' : '#A9AEB8'
            }
          },
          axisTick: {
            show: true,
            alignWithLabel: true,
            lineStyle: {
              color: '#86909C'
            }
          },
          axisLabel: {
            color: '#86909C'
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#86909C',
            formatter(value: number, idx: number) {
              if (idx === 0) return `${value}`
              return `${value / 1000}k`
            }
          },
          splitLine: {
            lineStyle: {
              color: isDark ? '#3F3F3F' : '#E5E6EB'
            }
          }
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          formatter(params: any) {
            const [firstElement] = params
            return `<div>
                <p class="tooltip-title">${firstElement.axisValueLabel}</p>
                ${tooltipItemsHtmlString(params)}
              </div>`
          },
          className: 'echarts-tooltip-diy'
        },
        series: [
          {
            name: '纯文本',
            data: textChartsData.value,
            stack: 'one',
            type: 'bar',
            barWidth: 16,
            color: isDark ? '#4A7FF7' : '#246EFF'
          },
          {
            name: '图文类',
            data: imgChartsData.value,
            stack: 'one',
            type: 'bar',
            color: isDark ? '#085FEF' : '#00B2FF'
          },
          {
            name: '视频类',
            data: videoChartsData.value,
            stack: 'one',
            type: 'bar',
            color: isDark ? '#01349F' : '#81E2FF',
            itemStyle: {
              borderRadius: 2
            }
          }
        ]
      }
    })
    const fetchData = async () => {
      //   setLoading(true)
      try {
        const { data: chartData } = await queryContentPublish()
        xAxis.value = chartData[0].x
        chartData.forEach((el: any) => {
          if (el.name === '纯文本') {
            textChartsData.value = el.y
          } else if (el.name === '图文类') {
            imgChartsData.value = el.y
          }
          videoChartsData.value = el.y
        })
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        // setLoading(false)
      }
    }
    fetchData()
    const { t } = useI18n()
    return () => (
      <Spin class="w-full">
        <Card class="general-card" title={t('dataAnalysis.contentPublishRatio')}>
          <ChartComponent height="326px" options={chartOption.value} />
        </Card>
      </Spin>
    )
  }
})
