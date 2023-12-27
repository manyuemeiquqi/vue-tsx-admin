import axios from 'axios'
import type { BaseInfoModel, ChannelInfoModel, GroupFormModel } from './type'
import type { OKResponse } from '@/types/global'
export type { BaseInfoModel, ChannelInfoModel, GroupFormModel }

export type UnitChannelModel = BaseInfoModel & ChannelInfoModel

export function submitChannelForm(data: UnitChannelModel) {
  return axios.post<OKResponse>('/api/channel-form/submit', { data })
}

export function submitGroupForm(data: GroupFormModel) {
  return axios.post<OKResponse>('/api/channel-form/group', { data })
}
