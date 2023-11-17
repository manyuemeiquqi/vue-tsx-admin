import { defineComponent, nextTick, ref } from 'vue'
import VCharts from 'vue-echarts'
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
    nextTick(() => {
      renderChart.value = true
    })
    return () =>
      renderChart.value ? (
        <VCharts
          option={props.options}
          autoresize={props.autoResize}
          style={{ width: props.width, height: props.height }}
        ></VCharts>
      ) : (
        <></>
      )
  }
})
