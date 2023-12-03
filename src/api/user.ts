import type { UserInfo } from '@/types/global'
import axios from 'axios'
export interface EnterpriseCertificationModel {
  accountType: number
  status: number
  time: string
  legalPerson: string
  certificateType: string
  authenticationNumber: string
  enterpriseName: string
  enterpriseCertificateType: string
  organizationCode: string
}

export type CertificationRecord = Array<{
  certificationType: number
  certificationContent: string
  status: number
  time: string
}>
export interface UnitCertification {
  enterpriseInfo: EnterpriseCertificationModel
  record: CertificationRecord
}
export function getUserInfo() {
  return axios.post<UserInfo>('/api/user/info')
}

export function queryCertification() {
  return axios.post<UnitCertification>('/api/user/certification')
}
