import type { UserInfo } from '@/types/global'
import axios from 'axios'

export function getUserInfo() {
  return axios.post<UserInfo>('/api/user/info')
}
