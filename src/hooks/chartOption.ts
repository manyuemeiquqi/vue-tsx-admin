import { computed } from 'vue'
import { type EChartsOption } from 'echarts'
import { useApplicationStore } from '@/store'

interface optionsFn {
  (isDark: boolean): EChartsOption
}

export default function useChartOption(sourceOption: optionsFn) {
  const applicationStore = useApplicationStore()
  const chartOption = computed<EChartsOption>(() => {
    return sourceOption(applicationStore.isDark)
  })
  return {
    chartOption
  }
}
