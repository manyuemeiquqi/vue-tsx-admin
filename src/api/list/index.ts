import axios from 'axios'
import qs from 'query-string'
import type { Pagination } from '@/types/global'
import type { ServiceRecord, ChatRecord, PolicyQuery, PolicyListRes, PolicyRecord } from './type'
export type { ServiceRecord, ChatRecord, PolicyQuery, PolicyListRes, PolicyRecord }
export function queryInspectionList() {
  return axios.get<ServiceRecord[]>('/api/list/quality-inspection')
}

export function queryTheServiceList() {
  return axios.get<ServiceRecord[]>('/api/list/the-service')
}

export function queryRulesPresetList() {
  return axios.get<ServiceRecord[]>('/api/list/rules-preset')
}

export function queryChatList() {
  return axios.post<ChatRecord[]>('/api/chat/list')
}
export function queryPolicyList(params: PolicyQuery & Pagination) {
  return axios.get<PolicyListRes>('/api/list/policy', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj)
    }
  })
}
