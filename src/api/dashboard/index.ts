import axios from 'axios'
import type { TableData } from '@arco-design/web-vue/es/table/interface'
import type { ChatRecord, ContentDataRecord, PopularRecord } from './type'

export type { ContentDataRecord, PopularRecord }

export function queryContentData() {
  return axios.get<ContentDataRecord[]>('/api/content-data')
}

export function queryPopularList(params: { type: string }) {
  return axios.get<TableData[]>('/api/popular/list', { params })
}

export function queryChatList() {
  return axios.post<ChatRecord[]>('/api/chat/list')
}
