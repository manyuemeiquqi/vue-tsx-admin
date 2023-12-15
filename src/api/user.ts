import type { UserInfo } from '@/types/global'
import axios from 'axios'
import type { RouteRecordNormalized } from 'vue-router'
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

export interface LatestActivity {
  id: number
  title: string
  description: string
  avatar: string
}
export function queryLatestActivity() {
  return axios.post<LatestActivity[]>('/api/user/latest-activity')
}

export interface ProjectItem {
  id: number
  name: string
  description: string
  peopleNumber: number
  contributors: {
    name: string
    avatar: string
    email: string
  }[]
}
export function queryMyProjectList() {
  return axios.post<ProjectItem[]>('/api/user/my-project/list')
}
export interface TeamItem {
  id: number
  avatar: string
  name: string
  peopleNumber: number
}
export function queryMyTeamList() {
  return axios.post<TeamItem[]>('/api/user/my-team/list')
}

export interface LoginData {
  username: string
  password: string
}

export interface LoginRes {
  token: string
}
export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/user/login', data)
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout')
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu')
}
