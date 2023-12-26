import axios from 'axios'
import type {
  LatestActivity,
  LoginData,
  LoginRes,
  ProjectItem,
  TeamItem,
  UnitCertification,
  UserInfo,
  BasicInfoModel
} from './type'
export type {
  UserInfo,
  LatestActivity,
  LoginData,
  LoginRes,
  ProjectItem,
  TeamItem,
  UnitCertification,
  BasicInfoModel
}

export function getUserInfo() {
  return axios.post<UserInfo>('/api/user/info')
}

export function queryCertification() {
  return axios.post<UnitCertification>('/api/user/certification')
}

export function queryLatestActivity() {
  return axios.post<LatestActivity[]>('/api/user/latest-activity')
}

export function queryMyProjectList() {
  return axios.post<ProjectItem[]>('/api/user/my-project/list')
}

export function queryMyTeamList() {
  return axios.post<TeamItem[]>('/api/user/my-team/list')
}

export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/user/login', data)
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout')
}

export function saveUserInfo() {
  return axios.post('/api/user/save-info')
}

export function userUploadApi(data: FormData) {
  return axios.post('/api/user/upload', data)
}
