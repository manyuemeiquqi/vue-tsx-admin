import axios, { type AxiosResponse } from 'axios'
import useLoading from './loading'
import { ref } from 'vue'

const useRequest = <T>(request: () => Promise<AxiosResponse>) => {
  const { loading, setLoading } = useLoading()
  const response = ref<T>()
  request()
    .then((res) => {
      response.value = res.data as T
      console.log('response111: ', response)
    })
    .finally(() => {
      setLoading(false)
    })
  return { loading, response }
}
// axios.get()
export default useRequest
