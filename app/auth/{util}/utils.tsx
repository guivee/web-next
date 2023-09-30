import { IAuthObj } from './user_util'

export const readCookies = (nextCookies: any) => {
  let authObj: IAuthObj = {
    user_id: undefined,
    refresh_token: undefined,
    id_token: undefined,
    access_token: undefined,
  }
  if (nextCookies) {
    nextCookies.getAll().map((cookie: { name: string; value: string }) => {
      if (cookie.name.includes('LastAuthUser')) {
        authObj = {
          ...authObj,
          user_id: cookie.value,
        }
      } else if (cookie.name.includes('refreshToken')) {
        authObj = {
          ...authObj,
          refresh_token: cookie.value,
        }
      } else if (cookie.name.includes('idToken')) {
        authObj = {
          ...authObj,
          id_token: cookie.value,
        }
      } else if (cookie.name.includes('accessToken')) {
        authObj = {
          ...authObj,
          access_token: cookie.value,
        }
      }
    })
  }
  return authObj
}

// function to convert array to string
export function arrayToString(arr: any) {
  let str = ''
  if (!arr) return str
  arr.forEach((item: any) => {
    str += item + ','
  })

  // remove last comma
  str = str.slice(0, -1)

  return str
}
