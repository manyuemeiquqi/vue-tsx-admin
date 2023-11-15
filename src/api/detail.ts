import axios from 'axios'
export type operationLogRes = Array<{
  key: string
  contentNumber: string
  updateContent: string
  status: number
  updateTime: string
}>

// 暂时使用没有封装的 请求测试
export function queryOperationLog() {
  return axios.get<operationLogRes>('/api/operation/log')
}
