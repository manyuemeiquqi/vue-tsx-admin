import { defineComponent, nextTick, ref } from 'vue'
import VChart from 'vue-echarts'
export default defineComponent({
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  setup(props) {
    const renderChart = ref<boolean>(false)
    const option = ref({
      title: {
        text: 'Traffic Sources',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines']
      },
      series: [
        {
          name: 'Traffic Sources',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 335, name: 'Direct' },
            { value: 310, name: 'Email' },
            { value: 234, name: 'Ad Networks' },
            { value: 135, name: 'Video Ads' },
            { value: 1548, name: 'Search Engines' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
    nextTick(() => {
      console.log(props.options)

      renderChart.value = true
    })
    return () =>
      renderChart.value && (
        <VChart
          style={{
            width: '500px',
            height: '500px'
          }}
          option={props.options}
          autoresize={true}
        ></VChart>
      )
  }
})
