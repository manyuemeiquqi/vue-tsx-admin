import { computed } from 'vue'
import { type EChartsOption } from 'echarts'
import { useAppStore } from '@/store'

interface optionsFn {
  (isDark: boolean): EChartsOption
}

export default function useChartOption(sourceOption: optionsFn) {
  const applicationStore = useAppStore()
  const chartOption = computed<EChartsOption>(() => {
    return sourceOption(applicationStore.isDark)
  })
  return {
    chartOption
  }
}
