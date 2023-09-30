export interface ResourceAccess {
  read: boolean
  write: boolean
  delete: boolean
}
export enum RoleEnum {
  OWNER = 'owner',
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  RECEPTIONIST = 'receptionist',
  MEMBER = 'member',
}

export type ACLType = {
  [resource_type in ResourceType]: {
    owner: ResourceAccess
    admin: ResourceAccess
    doctor: ResourceAccess
    receptionist: ResourceAccess
  }
}

export type ResourceType =
  | 'prescription_management'
  | 'user_management'
  | 'organization_management'
  | 'location_management'
  | 'billing_management'
  | 'patient_management'
  | 'patient_health_management'

export enum ResourceTypeEnum {
  PRESCRIPTION = 'prescription_management',
  USER = 'user_management',
  BILLING = 'billing_management',
  PATIENT = 'patient_management',
  ORGANIZATION = 'organization_management',
  LOCATION = 'location_management',
  PATIENT_HEALTH = 'patient_health_management',
}

export type Actions = 'read' | 'write' | 'delete'
export enum ActionsEnum {
  READ = 'read',
  WRITE = 'write',
  DELETE = 'delete',
}

export type AccessType = { [resource_type in ResourceType]: ResourceAccess }

export type User = {
  user_id: string
  full_name: string
  access_roles: RoleEnum[]
  access?: AccessType
  organization_id: string
  email: string
  title?: string
  subscription_id?: string
  subscription_customer_details?: {
    address: {
      city: string
      country: string
      line1: string
      line2: string
      postal_code: string
      state: string
    }
    email: string
    name: string
    phone: string
  }
  stripe_id?: string
  pk?: string
  sk?: string
  created?: string
  updated?: string
  provider_id?: string
}

export type CognitoUser = {
  full_name: string
  user_id: string
  email: string
  organization_id: string
  organization_name: string
  access_roles: RoleEnum[]
}

export const canEditUsersRoles = (user: User) => {
  return user && user.access && user.access.user_management.write
}

export type TabKey = 'account' | 'users' | 'organization' | 'billing'

export type Tab = {
  key: TabKey
  name: string
  href: string
  current?: boolean
  permissionRoles: RoleEnum[]
}

export type Organization = {
  hpio?: string
  name: string
  abn: string
  phone: string
  street_address: string
  city: string
  state: string
  country: string
  zip: string
  website: string
  type: string
  email: string
}
