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
export type Certification = {
  certificationType: number
  certificationContent: string
  status: number
  time: string
}

export type RoleType = '' | '*' | 'admin' | 'user'

export interface UserInfo {
  name?: string
  avatar?: string
  job?: string
  organization?: string
  location?: string
  email?: string
  introduction?: string
  personalWebsite?: string
  jobName?: string
  organizationName?: string
  locationName?: string
  phone?: string
  registrationDate?: string
  accountId?: string
  certification?: number
  role: RoleType
}
export type CertificationRecord = Certification[]

export interface UnitCertification {
  enterpriseInfo: EnterpriseCertificationModel
  record: CertificationRecord
}

export interface LatestActivity {
  id: number
  title: string
  description: string
  avatar: string
}
export interface MyProjectRecord {
  id: number
  name: string
  description: string
  peopleNumber: number
  contributors: {
    name: string
    email: string
    avatar: string
  }[]
}

export interface BasicInfoModel {
  email: string
  nickname: string
  countryRegion: string
  area: string
  address: string
  profile: string
}

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

export interface TeamItem {
  id: number
  avatar: string
  name: string
  peopleNumber: number
}

export interface LoginData {
  username: string
  password: string
}

export interface LoginRes {
  token: string
}
