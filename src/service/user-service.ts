import axios from 'axios'
import {
  getCreateProviderUrl,
  getOrganizationSearchUrl,
  getReadOrganizationUrl,
  getReadProviderUrl,
  getRevalidateOrganizationUrl,
  getRevalidateProviderUrl,
  getSearchProviderUrl,
  getUpdateOrganizationUrl,
  getUpdateProviderIdentifierUrl,
  getUpdateProviderUrl,
} from '../lib/api_endpoints'
import { axiosErrorHandler } from '../lib/helper'
import { ServerResponse } from '../../app/dashboard/{util}/basic-utils'
import { Provider } from '../../app/{lib}/provider_types'

export async function searchProvider(
  organization_id: string,
  id_token: string,
  data: Provider
): Promise<any> {
  const body = {
    hpii_number: data.hpii_number,
    family_name: data.family_name,
    given_names: [data.given_name],
    date_of_birth: data.date_of_birth,
    sex: data.sex,
  }
  const endpoint = getSearchProviderUrl(organization_id)
  const headers = { Authorization: `Bearer ${id_token}` }
  console.log('searchProvider is called with: ', endpoint, body, { headers })

  let serverResponse: ServerResponse = {
    statusCode: 0,
    data: undefined,
    message: '',
  }

  await axios
    .post(endpoint, body, { headers })
    .then((response) => {
      const { data, message, statusCode }: ServerResponse = response.data
      serverResponse = { data, message, statusCode }
    })
    .catch((error) => {
      let errorData = undefined
      if (error.code === 'ERR_NETWORK') {
        // HS API is down
        errorData = {
          data: {
            action: {
              notify: {
                value: true,
                message:
                  'Parchment Health Service may be unavailable. Please try again later.',
              },
            },
          },
          message:
            'Parchment Health Service may be unavailable. Please try again later.',
          statusCode: 500,
        }
      } else {
        errorData = error.response.data
      }
      const { data, message, statusCode }: ServerResponse = errorData
      serverResponse = { data, message, statusCode }
    })

  console.log('searchProvider: serverResponse=', serverResponse)

  return serverResponse
}
export async function createProvider(
  organization_id: string,
  id_token: string,
  body: any
): Promise<any> {
  console.log('createProvider: body=', body)
  const endpoint = getCreateProviderUrl(organization_id)
  const headers = { Authorization: `Bearer ${id_token}` }

  let serverResponse: ServerResponse = {
    statusCode: 0,
    data: undefined,
    message: '',
  }

  await axios
    .put(endpoint, body, { headers })
    .then((response) => {
      const { data, message, statusCode }: ServerResponse = response.data
      serverResponse = { data, message, statusCode }
    })
    .catch((error) => {
      const { data, message, statusCode }: ServerResponse = error.response.data
      serverResponse = { data, message, statusCode }
    })

  return serverResponse
}

export async function readProvider(
  organization_id: string,
  provider_id: string,
  id_token: string
): Promise<any> {
  const endpoint = getReadProviderUrl(organization_id, provider_id)
  const headers = { Authorization: `Bearer ${id_token}` }

  let serverResponse: ServerResponse = {
    statusCode: 0,
    data: undefined,
    message: '',
  }
  await axios
    .get(endpoint, { headers })
    .then((response) => {
      const { data, message, statusCode }: ServerResponse = response.data
      serverResponse = { data, message, statusCode }
    })
    .catch((error) => {
      const { data, message, statusCode }: ServerResponse = error.response.data
      serverResponse = { data, message, statusCode }
    })

  return serverResponse
}

export async function readProviderFetch(
  organization_id: string,
  provider_id: string,
  id_token: string
): Promise<any> {
  const endpoint = getReadProviderUrl(organization_id, provider_id)
  const options = {
    headers: { Authorization: id_token },
  }

  const res = await fetch(endpoint, options)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    console.log("readProviderFetch() didn't work: ", res.statusText)
    // This will activate the closest `error.js` Error Boundary
    // throw new Error(USER_DETAILS_FETCH_FAILED)
  }

  return res.json()
}

export async function revalidateProvider(
  organization_id: string,
  provider_id: string,
  id_token: string
): Promise<any> {
  const endpoint = getRevalidateProviderUrl()
  const headers = { Authorization: `Bearer ${id_token}` }

  const body = {
    organization_id,
    provider_id,
  }

  let serverResponse: ServerResponse = {
    statusCode: 0,
    data: undefined,
    message: '',
  }

  await axios
    .post(endpoint, body, { headers })
    .then((response) => {
      const { data, message, statusCode }: ServerResponse = response.data
      serverResponse = { data, message, statusCode }
    })
    .catch((error) => {
      const { data, message, statusCode }: ServerResponse = error.response.data
      serverResponse = { data, message, statusCode }
    })

  return serverResponse
}

export async function updateProvider(
  organization_id: string,
  provider_id: string,
  body: any,
  updateDemographics: boolean = false,
  id_token: string
): Promise<any> {
  const endpoint = getUpdateProviderUrl(
    organization_id,
    provider_id,
    updateDemographics
  )
  const headers = { Authorization: `Bearer ${id_token}` }

  let serverResponse: ServerResponse = {
    statusCode: 0,
    data: undefined,
    message: '',
  }
  await axios
    .post(endpoint, body, { headers })
    .then((response) => {
      const { data, message, statusCode }: ServerResponse = response.data
      serverResponse = { data, message, statusCode }
    })
    .catch((error) => {
      const { data, message, statusCode }: ServerResponse = error.response.data
      serverResponse = { data, message, statusCode }
    })

  return serverResponse
}

export async function updateProviderIdentifier(
  organization_id: string,
  provider_id: string,
  body: any,
  id_token: string
): Promise<any> {
  const endpoint = getUpdateProviderIdentifierUrl(organization_id, provider_id)
  const headers = { Authorization: `Bearer ${id_token}` }

  let serverResponse: ServerResponse = {
    statusCode: 0,
    data: undefined,
    message: '',
  }
  await axios
    .patch(endpoint, body, { headers })
    .then((response) => {
      const { data, message, statusCode }: ServerResponse = response.data
      serverResponse = { data, message, statusCode }
    })
    .catch((error) => {
      const { data, message, statusCode }: ServerResponse = error.response.data
      serverResponse = { data, message, statusCode }
    })

  return serverResponse
}

export async function searchOrganization(
  organization_id: string,
  id_token: string,
  body: any
): Promise<any> {
  console.log('searchHII: body=', body)
  const endpoint =
    getOrganizationSearchUrl() + `?organization_id=${organization_id}`
  const headers = { Authorization: `Bearer ${id_token}` }

  let serverResponse: ServerResponse = {
    statusCode: 0,
    data: undefined,
    message: '',
  }
  await axios
    .post(endpoint, body, { headers })
    .then((response) => {
      const { data, message, statusCode }: ServerResponse = response.data
      serverResponse = { data, message, statusCode }
    })
    .catch((error) => {
      let errorData = undefined
      if (error.code === 'ERR_NETWORK') {
        // HS API is down
        errorData = {
          data: {
            action: {
              notify: {
                value: true,
                message:
                  'Parchment Health Service may be unavailable. Please try again later.',
              },
            },
          },
          message:
            'Parchment Health Service may be unavailable. Please try again later.',
          statusCode: 500,
        }
      } else {
        errorData = error.response.data
      }
      const { data, message, statusCode }: ServerResponse = errorData
      serverResponse = { data, message, statusCode }
    })

  return serverResponse
}

export async function readOrganization(
  organization_id: string,
  id_token: string
): Promise<any> {
  const endpoint = getReadOrganizationUrl(organization_id)
  const headers = { Authorization: `Bearer ${id_token}` }

  let serverResponse: ServerResponse = {
    statusCode: 0,
    data: undefined,
    message: '',
  }
  await axios
    .get(endpoint, { headers })
    .then((response) => {
      const { data, message, statusCode }: ServerResponse = response.data
      serverResponse = { data, message, statusCode }
    })
    .catch((error) => {
      const { data, message, statusCode }: ServerResponse = error.response.data
      serverResponse = { data, message, statusCode }
    })

  return serverResponse
}

export async function updateOrganization(
  organization_id: string,
  body: any,
  id_token: string
): Promise<any> {
  const endpoint = getUpdateOrganizationUrl(organization_id)
  const headers = { Authorization: `Bearer ${id_token}` }

  let serverResponse: ServerResponse = {
    statusCode: 0,
    data: undefined,
    message: '',
  }
  await axios
    .post(endpoint, body, { headers })
    .then((response) => {
      const { data, message, statusCode }: ServerResponse = response.data
      serverResponse = { data, message, statusCode }
    })
    .catch((error) => {
      const { data, message, statusCode }: ServerResponse = error.response.data
      serverResponse = { data, message, statusCode }
    })

  return serverResponse
}

export async function revalidateOrganization(
  organization_id: string,
  id_token: string
): Promise<any> {
  const endpoint = getRevalidateOrganizationUrl()
  const headers = { Authorization: `Bearer ${id_token}` }

  const body = {
    organization_id,
  }

  let serverResponse: ServerResponse = {
    statusCode: 0,
    data: undefined,
    message: '',
  }

  await axios
    .post(endpoint, body, { headers })
    .then((response) => {
      const { data, message, statusCode }: ServerResponse = response.data
      serverResponse = { data, message, statusCode }
    })
    .catch((error) => {
      const { data, message, statusCode }: ServerResponse = error.response.data
      serverResponse = { data, message, statusCode }
    })

  return serverResponse
}
