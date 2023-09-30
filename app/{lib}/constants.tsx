import { IHeadMeta } from './types'

export const BR_TITLE = 'Bakerue - Bakery Management Software for Home Bakers'
export const BR_DESCRIPTION =
  'Bakerue is a powerful cake order management software. Hassle-free bookings. Manage cake orders for free. Easy online payments. Ask for a live demo.'

export const defaultMetaObj: IHeadMeta = {
  description: BR_DESCRIPTION,
  title: BR_TITLE,
  image: '',
  path: '',
}

export const USER_DETAILS_FETCH_FAILED = 'Failed to fetch user details'
export const ORG_USER_DETAILS_FETCH_FAILED = 'Failed to fetch Org Users'

export const USER_MUST_BE_SIGNED_IN =
  'You must be signed in to access this page'
export const SUBSCRIPTION_DETAILS_FETCH_FAILED =
  'Failed to fetch subscription details'
export const INVALID_SIGNUP_FIELDS = 'Invalid signup fields'
export const INVALID_LOGIN_FIELDS = 'Invalid login fields'
export const INVALID_PASSWORD_RESET_FIELDS = 'Invalid password reset fields'
export const AUTH_FAILURE = 'Error: Parchment authentication failure'

export const ORGANIZATION_READ_ONLY_LABEL_MAP = [
  {
    label: 'HPIO#',
    key: 'hpio',
  },
  {
    label: 'ABN #',
    key: 'abn',
  },
  {
    label: 'Phone',
    key: 'phone',
  },
  {
    label: 'Suburb',
    key: 'street_address',
  },
  {
    label: 'State',
    key: 'state',
  },
  {
    label: 'Zip',
    key: 'zip',
  },
  {
    label: 'Website',
    key: 'website',
  },
  {
    label: 'Type',
    key: 'type',
  },
  {
    label: 'Email',
    key: 'email',
  },
]
