import { ref } from 'vue'

export default function useLoading(initialState: boolean = false) {
  const loading = ref<boolean>(initialState)

  const setLoading = (state: boolean) => {
    loading.value = state
  }
  const toggleLoading = () => (loading.value = !loading.value)
  return {
    loading,
    setLoading,
    toggleLoading
  }
}
