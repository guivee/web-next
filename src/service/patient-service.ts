import axios from 'axios'
import {
  getCreatePatientUrl,
  getPatientSearchUrl,
  getReadPatientUrl,
  getReadPatientsUrl as getReadPatientsUrl,
  getRevalidatePatientUrl,
  getUpdatePatientIdentifierUrl,
  getUpdatePatientUrl,
} from '../lib/api_endpoints'
import { axiosErrorHandler } from '../lib/helper'
import { ServerResponse } from '../../app/dashboard/{util}/basic-utils'

export async function searchHII(
  organization_id: string,
  id_token: string,
  body: any
): Promise<any> {
  console.log('searchHII: body=', body)
  const endpoint = getPatientSearchUrl() + `?organization_id=${organization_id}`
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
export async function createPatient(
  organization_id: string,
  id_token: string,
  body: any
): Promise<ServerResponse> {
  const endpoint = getCreatePatientUrl(organization_id, false)
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

export async function readPatients(
  organization_id: string,
  id_token: string
): Promise<any> {
  const endpoint = getReadPatientsUrl(organization_id, false)
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

export async function readPatient(
  organization_id: string,
  patient_id: string,
  id_token: string
): Promise<any> {
  const endpoint = getReadPatientUrl(organization_id, patient_id, false)
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

export async function revalidatePatient(
  organization_id: string,
  patient_id: string,
  id_token: string
): Promise<any> {
  const endpoint = getRevalidatePatientUrl()
  const headers = { Authorization: `Bearer ${id_token}` }

  const body = {
    organization_id,
    patient_id,
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

export async function updatePatient(
  organization_id: string,
  patient_id: string,
  updateDemographics: boolean = false,
  body: any,
  id_token: string
): Promise<any> {
  const endpoint = getUpdatePatientUrl(
    organization_id,
    patient_id,
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

export async function updatePatientIdentifier(
  organization_id: string,
  patient_id: string,
  body: any,
  id_token: string
): Promise<any> {
  const endpoint = getUpdatePatientIdentifierUrl(organization_id, patient_id)
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
