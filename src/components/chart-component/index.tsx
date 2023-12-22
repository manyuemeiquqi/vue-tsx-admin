import { defineComponent, nextTick, ref } from 'vue'
import VChart from 'vue-echarts'
export default defineComponent({
  name: 'ChartComponent',
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
    nextTick(() => {
      renderChart.value = true
    })
    return () =>
      renderChart.value && (
        <VChart
          style={{
            width: props.width,
            height: props.height
          }}
          option={props.options}
          autoresize={props.autoResize}
        ></VChart>
      )
  }
})
