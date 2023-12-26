import axios from 'axios'
import type { ProfileBasicRes, operationLogRes } from './type'
export type { ProfileBasicRes, operationLogRes }
export function queryOperationLog() {
  return axios.get<operationLogRes>('/api/operation/log')
}

export function queryProfileBasic() {
  return axios.get<ProfileBasicRes>('/api/profile/basic')
}
