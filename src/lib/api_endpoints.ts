const DOMAIN_API = process.env.NEXT_PUBLIC_DOMAIN_API

// stripe-service
export const getStripeSubscriptionUrl = (subscription_id: string) =>
  DOMAIN_API + `/stripe/subscription/${subscription_id}`

// user-service
export const getCreateUserUrl = () => DOMAIN_API + '/user-service'
export const getUpdateUserUrl = (organization_id: string, user_id: string) =>
  DOMAIN_API + `/user-service/organizations/${organization_id}/users/${user_id}`
export const getReadUserUrl = (organization_id: string, user_id: string) =>
  DOMAIN_API + `/user-service/organizations/${organization_id}/users/${user_id}`
export const getReadUserSelfUrl = () => DOMAIN_API + '/user-service/self'
export const getReadOrganizationUrl = (organization_id: string) =>
  DOMAIN_API + `/user-service/organizations/${organization_id}`
export const getSearchProviderUrl = (organization_id: string) =>
  DOMAIN_API +
  `/user-service/search-provider-hs?organization_id=${organization_id}`

export const getCreateProviderUrl = (organization_id: string) =>
  DOMAIN_API + `/user-service/organizations/${organization_id}/providers`
export const getUpdateProviderUrl = (
  organization_id: string,
  provider_id: string,
  updateDemographics: boolean
) =>
  DOMAIN_API +
  `/user-service/organizations/${organization_id}/providers/${provider_id}?updateDemographics=${updateDemographics}`

export const getUsersUrl = (organization_id: string) =>
  DOMAIN_API + `/user-service/organizations/${organization_id}/users`

export const getPatientSearchUrl = () =>
  DOMAIN_API + '/patient-service/search-hs'

export const getOrganizationSearchUrl = () =>
  DOMAIN_API + '/user-service/search-organization-hs'

export const getCreatePatientUrl = (
  organization_id: string,
  mandateIHI: boolean
) =>
  DOMAIN_API +
  `/patient-service/organizations/${organization_id}/patients?mandateIHI=${mandateIHI}`

export const getReadPatientsUrl = (
  organization_id: string,
  mandateIHI: boolean
) => DOMAIN_API + `/patient-service/organizations/${organization_id}/patients`

export const getReadPatientUrl = (
  organization_id: string,
  patient_id: string,
  mandateIHI: boolean
) =>
  DOMAIN_API +
  `/patient-service/organizations/${organization_id}/patients/${patient_id}`

export const getUpdatePatientUrl = (
  organization_id: string,
  patient_id: string,
  updateDemographics: boolean = false
) =>
  DOMAIN_API +
  `/patient-service/organizations/${organization_id}/patients/${patient_id}?updateDemographics=${updateDemographics}`

export const getUpdatePatientIdentifierUrl = (
  organization_id: string,
  patient_id: string
) =>
  DOMAIN_API +
  `/patient-service/organizations/${organization_id}/patients/${patient_id}`

export const getRevalidatePatientUrl = () =>
  DOMAIN_API + '/patient-service/revalidate-patient'

export const getReadProviderUrl = (
  organization_id: string,
  provider_id: string
) =>
  DOMAIN_API +
  `/user-service/organizations/${organization_id}/providers/${provider_id}`

export const getRevalidateProviderUrl = () =>
  DOMAIN_API + '/user-service/revalidate-provider'

export const getUpdateProviderIdentifierUrl = (
  organization_id: string,
  provider_id: string
) =>
  DOMAIN_API +
  `/user-service/organizations/${organization_id}/providers/${provider_id}`

export const getUpdateOrganizationUrl = (organization_id: string) =>
  DOMAIN_API + `/user-service/organizations/${organization_id}`

export const getRevalidateOrganizationUrl = () =>
  DOMAIN_API + '/user-service/revalidate-organization'
