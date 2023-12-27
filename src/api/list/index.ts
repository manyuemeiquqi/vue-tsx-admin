import axios from 'axios'
import type { Pagination } from '@/types/global'
import type { ServiceRecord, PolicyQuery, PolicyListRes, PolicyRecord } from './type'
export type { ServiceRecord, PolicyQuery, PolicyListRes, PolicyRecord }
export function queryInspectionList() {
  return axios.get<ServiceRecord[]>('/api/list/quality-inspection')
}

export function queryTheServiceList() {
  return axios.get<ServiceRecord[]>('/api/list/the-service')
}

export function queryRulesPresetList() {
  return axios.get<ServiceRecord[]>('/api/list/rules-preset')
}

export function queryPolicyList(params: PolicyQuery & Pagination) {
  return axios.get<PolicyListRes>('/api/list/policy', {
    params
  })
}
