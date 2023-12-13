import { computed } from 'vue'
import { useApplicationStore } from '@/store'
import { ApplicationTheme } from '@/store/modules/application'
export default function useTheme() {
  const applicationStore = useApplicationStore()
  const isDark = computed(() => {
    console.log(ApplicationTheme)

    return applicationStore.theme === ApplicationTheme.dark
  })
  return {
    isDark
  }
}
