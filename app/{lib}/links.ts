export const HOME_LINK = '/dashboard'
export const SIGNIN_LINK = '/auth/login'
export const SIGNUP_LINK = '/auth/signup'
export const CONFIRM_LINK = '/auth/confirm'
export const RESET_LINK = '/auth/reset'
export const UNAUTHORISED_LINK = '/auth/unauthorised'
export const MFA_LINK = '/auth/mfa'
export const SETUP_MFA_LINK = '/auth/setup-mfa'
export const DASHBOARD_LINK = '/dashboard'
export const PATIENTS_LINK = `${DASHBOARD_LINK}/patients`
export const PATIENT_LOOKUP_LINK = `${PATIENTS_LINK}/lookup`
export const SETTINGS_LINK = `${DASHBOARD_LINK}/settings`
export const GENERAL_LINK = `${SETTINGS_LINK}/general`
export const ACCOUNT_LINK = `${SETTINGS_LINK}/account`
export const ACCOUNT_EDIT_LINK = `${ACCOUNT_LINK}/edit`
export const ACCOUNT_LOOKUP_LINK = `${ACCOUNT_LINK}/lookup`
export const USERS_LINK = `${SETTINGS_LINK}/users`
export const ORGANIZATION_LINK = `${SETTINGS_LINK}/organization`
export const ORGANIZATION_EDIT_LINK = `${ORGANIZATION_LINK}/edit`
export const BILLING_LINK = `${SETTINGS_LINK}/billing`
export const ADD_USER_LINK = `${USERS_LINK}/add`

export const TWITTER_URL = new URL('https://twitter.com/usebakerue')
export const INSTAGRAM_URL = new URL('https://www.instagram.com/usebakerue/')

// functions
export const BUILD_PRESCRIPTION_LINK = (patient_id: string) =>
  `${PATIENTS_LINK}/${patient_id}/prescriptions`
export const BUILD_PRESCRIPTION_DETAILS_LINK = (
  patient_id: string,
  prescription_id: string
) => `${PATIENTS_LINK}/${patient_id}/prescriptions/${prescription_id}`

export const BUILD_PATIENT_PROFILE_LINK = (patient_id: string) =>
  `/dashboard/patients/${patient_id}`

export const BUILD_PATIENT_PROFILE_EDIT_LINK = (patient_id: string) =>
  `/dashboard/patients/${patient_id}/edit`
