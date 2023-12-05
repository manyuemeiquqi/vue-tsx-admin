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
    const renderDataList = computed(() => [
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
      <Card class="general-card" title={t('dataAnalysis.title.publicOpinion')}>
        <Space>
          {renderDataList.value.map((item) => (
            <ChainItem title={item.title} quota={item.quota} chartType={item.chartType} />
          ))}
        </Space>
      </Card>
    )
  }
})
