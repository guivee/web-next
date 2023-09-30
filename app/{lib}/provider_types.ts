import { User } from './acl_types'

export type Provider = {
  pk?: any
  sk?: string
  created_at?: string
  updated_at?: string
  provider_id?: string
  hpii_number?: string
  organization_id?: string
  given_name: string
  family_name: string
  date_of_birth: string
  sex: Sex
  email?: string
  phone?: string
  no_given_name?: boolean
  australian_address?: AustralianAddress
  international_address?: InternationalAddress
  escript_status?: string
  hpii_status?: HPIIStatus
  demographic_key?: string
}

type Sex = 'M' | 'F' | 'O'
export type AustralianAddress = {
  street_number?: string
  street_name?: string
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

export type ProviderSearch = {
  given_names: string[]
  family_name: string
  date_of_birth?: string
  sex?: Sex
  hpii_number?: string
  australian_street_address?: AustralianAddress
  international_address?: InternationalAddress
  hpii_status?: HPIIStatus
}

export type Organization = {
  pk?: any
  sk?: string
  created_at?: string
  updated_at?: string
  organization_id?: string
  hpio_number?: string
  owner_id?: string
  name?: string
  email?: string
  phone?: string
  abn?: string
  australian_address?: AustralianAddress
  international_address?: InternationalAddress
  hpio_status?: HPIIStatus
}

export type OrganizationSearch = {
  hpio_number?: string
}

// create type for healthcare service request
export type ProviderSearchHS = {
  userId: string
  givenNames: string[]
  familyName: string
  dateOfBirth: string
  sex: Sex
  hpiiNumber?: string
  status?: HPIIStatus
  australianStreetAddress?: {
    streetNumber?: string
    streetName?: string
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

export type OrganizationSearchHS = {
  userId: string
  hpioNumber?: string
  status?: HPIIStatus
}

// export enum STATUS {
//   ACTIVE = 'ACTIVE',
//   INACTIVE = 'INACTIVE',
//   SUSPENDED = 'SUSPENDED',
//   DELETED = 'DELETED',
//   UNKNOWN = 'UNKNOWN',
//   VERIFIED = 'VERIFIED',
//   DECEASED = 'DECEASED',
//   RETIRED = 'RETIRED',
//   EXPIRED = 'EXPIRED',
//   RESOLVED = 'RESOLVED',
//   UNVERIFIED = 'UNVERIFIED',
//   PROVISIONAL = 'PROVISIONAL',
// }
export type HPIIStatus = 'A' | 'R' | 'D'

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

export type SearchAudit = {
  organization_id: string
  user_id: string
  provider_id: string
  csp_id: string
  software_version: string
  health_service_name: string
  payload: {}
}
