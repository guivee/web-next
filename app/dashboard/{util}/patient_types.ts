export type Patient = {
  pk?: any
  sk?: string
  created_at?: string
  updated_at?: string
  patient_id?: string
  ihi_number?: string
  dva_file_number?: string
  medicare_card_number?: string
  medicare_irn?: string
  organization_id?: string
  given_name?: string
  family_name: string
  date_of_birth: string
  sex: Sex
  email?: string
  phone?: string
  no_given_name?: boolean
  australian_address?: AustralianAddress
  international_address?: InternationalAddress
  escript_status?: string
  ihi_status?: IHINumberStatus
  ihi_record_status?: IHIRecordStatus
  demographic_key?: string
}

export type IdentifierName =
  | 'ihi_number'
  | 'medicare_card_number'
  | 'medicare_irn'
  | 'dva_file_number'

type Sex = 'M' | 'F' | 'O'
export type AustralianAddress = {
  street_number: string
  street_name: string
  suburb: string
  state: string
  postcode: string
}

type InternationalAddress = {
  international_state_province: string
  country: string
  international_postcode: string
  international_address_line: string
}

export type PatientSearch = {
  given_name?: string
  family_name: string
  medicare_card_number?: string
  medicare_irn?: string // "?" means optional field
  dva_file_number?: string
  ihi_number?: string
  date_of_birth: string // ISO date format e.g. "1990-12-31"
  sex: Sex
  no_given_name?: boolean
  australian_street_address?: AustralianAddress
  international_address?: InternationalAddress
  ihi_status?: IHINumberStatus
  ihi_record_status?: IHIRecordStatus
}

// create type for healthcare service request
export type PatientSearchHS = {
  userId: string
  givenName?: string // This needs to be optional because it is not always provided
  familyName: string
  medicareIRN?: string
  medicareCardNumber?: string
  dvaFileNumber?: string
  ihiNumber?: string
  dateOfBirth: string
  sex: Sex
  ihiStatus?: IHINumberStatus
  ihiRecordStatus?: IHIRecordStatus
  australianStreetAddress?: {
    streetNumber: string
    streetName: string
    suburb: string
    state: string
    postcode: string
  }
  internationalAddress?: {
    internationalStateProvince: string
    country: string
    internationalPostcode: string
    internationalAddressLine: string
  }
}

export enum STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  DELETED = 'DELETED',
  UNKNOWN = 'UNKNOWN',
  VERIFIED = 'VERIFIED',
  DECEASED = 'DECEASED',
  RETIRED = 'RETIRED',
  EXPIRED = 'EXPIRED',
  RESOLVED = 'RESOLVED',
  UNVERIFIED = 'UNVERIFIED',
  PROVISIONAL = 'PROVISIONAL',
}
export type IHINumberStatus =
  | 'ACTIVE'
  | 'DECEASED'
  | 'RETIRED'
  | 'EXPIRED'
  | 'RESOLVED'
  | 'UNKNOWN'

export type IHIRecordStatus =
  | 'VERIFIED'
  | 'UNVERIFIED'
  | 'PROVISIONAL'
  | 'UNKNOWN'

export type Action = {
  notify: Notify
  update?: boolean
  create?: boolean
}

export type Notify = {
  value: boolean
  message: string
}

export type SearchResponse = {
  search_result: Patient
  conflicts?: Patient[]
  action?: Action
}

export type RevalidationData = {
  revalidated_patient: Patient
  existing_patient: Patient
  action: Action
}

export type SearchAudit = {
  organization_id: string
  user_id: string
  patient_id: string
  csp_id: string
  software_version: string
  health_service_name: string
  payload: {}
}
