import ChartComponent from '@/components/chart-component/index'
import useChartOption from '@/hooks/chartOption'
import { Statistic } from '@arco-design/web-vue'
import axios from 'axios'
import { defineComponent, h, ref } from 'vue'
export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    quota: {
      type: String,
      default: ''
    },
    chartType: {
      type: String,
      default: ''
    },
    cardStyle: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props) {
    const barChartOptionsFactory = () => {
      const data = ref<any>([])
      const { chartOption } = useChartOption(() => {
        return {
          grid: {
            left: 0,
            right: 0,
            top: 10,
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
            trigger: 'axis'
          },
          series: {
            name: 'total',
            data,
            type: 'bar',
            barWidth: 7,
            itemStyle: {
              borderRadius: 2
            }
          }
        }
      })
      return {
        data,
        chartOption
      }
    }

    const lineChartOptionsFactory = () => {
      const data = ref<number[][]>([[], []])
      const { chartOption } = useChartOption(() => {
        return {
          grid: {
            left: 0,
            right: 0,
            top: 10,
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
            trigger: 'axis'
          },
          series: [
            {
              name: '2001',
              data: data.value[0],
              type: 'line',
              showSymbol: false,
              smooth: true,
              lineStyle: {
                color: '#165DFF',
                width: 3
              }
            },
            {
              name: '2002',
              data: data.value[1],
              type: 'line',
              showSymbol: false,
              smooth: true,
              lineStyle: {
                color: '#6AA1FF',
                width: 3,
                type: 'dashed'
              }
            }
          ]
        }
      })
      return {
        data,
        chartOption
      }
    }

    const pieChartOptionsFactory = () => {
      const data = ref<any>([])
      const { chartOption } = useChartOption(() => {
        return {
          grid: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          },
          legend: {
            show: true,
            top: 'center',
            right: '0',
            orient: 'vertical',
            icon: 'circle',
            itemWidth: 6,
            itemHeight: 6,
            textStyle: {
              color: '#4E5969'
            }
          },
          tooltip: {
            show: true
          },
          series: [
            {
              name: '总计',
              type: 'pie',
              radius: ['50%', '70%'],
              label: {
                show: false
              },
              data
            }
          ]
        }
      })
      return {
        data,
        chartOption
      }
    }

    const { chartOption: lineChartOption, data: lineData } = lineChartOptionsFactory()
    const { chartOption: barChartOption, data: barData } = barChartOptionsFactory()
    const { chartOption: pieChartOption, data: pieData } = pieChartOptionsFactory()
    const renderData = ref<any>({
      count: 0,
      growth: 0,
      chartData: []
    })
    const chartOption = ref({})
    const fetchData = async (params: any) => {
      try {
        const { data } = (await axios.post<any>('/api/public-opinion-analysis', params)).data
        renderData.value = data
        const { chartData } = data
        if (props.chartType === 'bar') {
          chartData.forEach((el: any, idx: number) => {
            barData.value.push({
              value: el.y,
              itemStyle: {
                color: idx % 2 ? '#2CAB40' : '#86DF6C'
              }
            })
          })
          chartOption.value = barChartOption.value
        } else if (props.chartType === 'line') {
          chartData.forEach((el: any) => {
            if (el.name === '2021') {
              lineData.value[0].push(el.y)
            } else {
              lineData.value[1].push(el.y)
            }
          })
          chartOption.value = lineChartOption.value
        } else {
          chartData.forEach((el: any) => {
            pieData.value.push(el)
          })
          chartOption.value = pieChartOption.value
        }
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        // setLoading(false)
      }
    }
    fetchData({ quota: props.quota })
    return () => (
      <div>
        <Statistic
          title={renderData.value.title}
          value={renderData.value.value}
          animation
          showGroupSeparator
          valueFrom={0}
        >
          {/* {{ prefix: () => h(renderData.value.prefix.icon) }} */}
        </Statistic>
        <ChartComponent options={chartOption.value} />
      </div>
    )
  }
})