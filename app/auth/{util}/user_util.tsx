import { cookies } from 'next/headers'
import {
  getCreateUserUrl,
  getUsersUrl,
  getStripeSubscriptionUrl,
} from '../../../src/lib/api_endpoints'
import { User } from '../../{lib}/acl_types'
import {
  ORG_USER_DETAILS_FETCH_FAILED,
  SUBSCRIPTION_DETAILS_FETCH_FAILED,
  USER_DETAILS_FETCH_FAILED,
  USER_MUST_BE_SIGNED_IN,
} from '../../{lib}/constants'
import { ISubscription, SUBSCRIPTION_STATUS } from '../../{lib}/types'
import { readCookies } from './utils'

export type IAuthObj = {
  user_id: string | undefined
  refresh_token: string | undefined
  id_token: string | undefined
  access_token: string | undefined
}

export const getAuthUser = () => {
  const nextCookies = cookies()
  const authObj: IAuthObj = readCookies(nextCookies)

  // console.log('Auth Token: ', authObj.id_token)

  return authObj
}

export async function getUsers(
  id_token: string,
  organization_id: string
): Promise<User[]> {
  const endpoint = getUsersUrl(organization_id)
  const options = {
    headers: { Authorization: `${id_token}` },
  }

  const res: any = await fetch(endpoint, options)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    console.log("getUsers() didn't work: ")
    // This will activate the closest `error.js` Error Boundary
    // throw new Error(ORG_USER_DETAILS_FETCH_FAILED)
  }

  return res.json()
}

export async function createUser(id_token: string, organization_id: string) {
  const body = {
    full_name: 'Jack Stevens ',
    email: 'jack.stevens@gmail.com',
    access_roles: ['Doctor'],
    user_id: '4333434-656565-45353-443434e',
  }

  const endpoint = getUsersUrl(organization_id)
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: id_token },
    body: JSON.stringify(body),
  }

  const res = await fetch(endpoint, options)

  // Recommendation: handle errors
  if (!res.ok) {
    console.log("createUser() didn't work: ")
    // This will activate the closest `error.js` Error Boundary
    throw new Error(USER_DETAILS_FETCH_FAILED)
  }

  return res.json()
}

export async function getUserSubscription(
  subscription_id: string | undefined
): Promise<ISubscription> {
  if (!subscription_id) {
    return {
      id: '',
      status: SUBSCRIPTION_STATUS.UNSUBSCRIBED,
      current_period_end: '',
      current_period_start: '',
    }
  }
  const endpoint = getStripeSubscriptionUrl(subscription_id)
  const options = {
    // headers: { Authorization: id_token },
  }

  const res = await fetch(endpoint, options)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error(SUBSCRIPTION_DETAILS_FETCH_FAILED)
  }

  // create subscription obect with deconstructed response
  const { id, status, current_period_end, current_period_start } =
    await res.json()

  return { id, status, current_period_end, current_period_start }
}
