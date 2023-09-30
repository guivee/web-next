import { User, RoleEnum } from './acl_types'

export const axiosErrorHandler = (functionName: string, error: any) => {
  console.log('')
  console.log('')
  console.log(`****************  ${functionName}()  ****************`)
  console.log('')

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error: ', error.message)
  }
  console.log('')
  console.log('')
  console.log('error.config: ', error.config)
  console.log(`*******************************************************`)
  console.log('')
  console.log('')
}

export const roundToTwoDecimal = (num: number) => {
  if (!num) return 0

  return Math.round((Number(num) + Number.EPSILON) * 100) / 100
}

export const getAbsoluteUrl = (asPath: string) => {
  return process.env.NEXT_PUBLIC_HOST + asPath
}

export const displayDollarValue = (num: Number) => {
  if (!num) return null
  const currency = '$'
  return `${currency}${Number(num).toFixed(2)}`
}

export const brLoader = ({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality: number
}) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

export const capitalize = (s: any[]) => {
  return s && s[0].toUpperCase() + s.slice(1)
}

export const generateTestSelector = (str: string) => {
  if (!str) return ''

  return str.replace(/\s/g, '-').toLocaleLowerCase()
}

// function that gets the user's initials in the format of 'AB'
export const getInitials = (name: string) => {
  if (!name) return ''

  const names = name.split(' ')
  let initials = names[0].substring(0, 1).toUpperCase()

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase()
  }

  return initials
}

// function that gets first name from full name
export const getFirstName = (name: string) => {
  if (!name) return ''

  const names = name.split(' ')
  return names[0]
}

export const isOwner = (user: User) =>
  user.access_roles.includes(RoleEnum.OWNER)

export const isAdmin = (user: User) =>
  user.access_roles.includes(RoleEnum.ADMIN)

export const isDoctor = (user: User) =>
  user.access_roles.includes(RoleEnum.DOCTOR)

export const isReceptionist = (user: User) =>
  user.access_roles.includes(RoleEnum.RECEPTIONIST)

export const isMember = (user: User) =>
  user.access_roles.includes(RoleEnum.MEMBER)
