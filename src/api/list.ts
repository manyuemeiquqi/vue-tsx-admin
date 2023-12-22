import axios from 'axios'
import qs from 'query-string'
import type { DescData } from '@arco-design/web-vue/es/descriptions/interface'
import type { Pagination } from '@/types/global'

export interface PolicyRecord {
  id: string
  number: number
  name: string
  contentType: 'img' | 'horizontalVideo' | 'verticalVideo'
  filterType: 'artificial' | 'rules'
  count: number
  status: 'online' | 'offline'
  createdTime: string
}
export interface PolicyQuery {
  number: string
  name: string
  createdTime: string | number | Date[]
  contentType: string
  filterType: string
  status: string
}
export interface PolicyParams extends Partial<PolicyRecord> {
  current: number
  pageSize: number
}

export interface PolicyListRes {
  list: PolicyRecord[]
  total: number
}

export function queryPolicyList(params: PolicyQuery & Pagination) {
  return axios.get<PolicyListRes>('/api/list/policy', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj)
    }
  })
}

export interface ServiceRecord {
  id: number
  title: string
  description: string
  name?: string
  actionType?: string
  icon?: string
  data?: DescData[]
  enable?: boolean
  expires?: boolean
}
export function queryInspectionList() {
  return axios.get<ServiceRecord[]>('/api/list/quality-inspection')
}

export function queryTheServiceList() {
  return axios.get<ServiceRecord[]>('/api/list/the-service')
}

export function queryRulesPresetList() {
  return axios.get<ServiceRecord[]>('/api/list/rules-preset')
}
export interface ChatRecord {
  id: number
  username: string
  content: string
  time: string
  isCollect: boolean
}

export function queryChatList() {
  return axios.post<ChatRecord[]>('/api/chat/list')
}
