import axios from 'axios'

import { getReadOrganizationUrl } from '../lib/api_endpoints'
import { axiosErrorHandler } from '../../app/{lib}/utils'
import { Organization } from '../../app/{lib}/acl_types'

export const updateOrgService = async (idToken: string, body: any) => {
  const endpoint = getReadOrganizationUrl('')
  let result
  const headers = {
    Authorization: `${idToken}`,
  }

  // write axios put request with authorization header

  await axios
    .put(endpoint, body, {
      headers,
    })
    .then(({ data }) => {
      result = data
    })
    .catch((error) => {
      axiosErrorHandler('createOrg', error)
    })

  return result
}

const parseOrg = (obj: any): Organization => {
  return {
    name: obj.data.name,
    abn: obj.data.abn,
    phone: obj.data.phone,
    street_address: obj.data.international_address?.line1,
    city: obj.data.international_address?.city,
    state: obj.data.international_address?.state,
    zip: obj.data.international_address?.city,
    country: obj.data.international_address?.country,
    website: obj.data.website,
    type: obj.data.website,
    email: obj.data.email,
  }
}

export const getOrgService = async (
  idToken: string,
  org_id: any
): Promise<Organization> => {
  const endpoint = getReadOrganizationUrl(org_id)
  let result
  const headers = {
    Authorization: `${idToken}`,
  }
  await axios
    .get(endpoint, {
      headers,
    })
    .then(({ data }) => {
      result = parseOrg(data)
    })
    .catch((error) => {
      axiosErrorHandler('getOrgService', error)
    })
  return result || ({} as Organization)
}
