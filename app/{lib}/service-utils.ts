import {
  getCreateUserUrl,
  getReadUserSelfUrl,
} from '../../src/lib/api_endpoints'

export async function getLoggedInUser(id_token: string): Promise<any> {
  const endpoint = getReadUserSelfUrl()
  const options = {
    headers: { Authorization: id_token },
  }

  const res = await fetch(endpoint, options)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    console.log("getLoggedInUser() didn't work: ", res.statusText)
    // This will activate the closest `error.js` Error Boundary
    // throw new Error(USER_DETAILS_FETCH_FAILED)
  }

  return res.json()
}
