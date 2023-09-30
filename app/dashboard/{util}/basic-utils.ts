import moment from 'moment'

// function to make first letter of string capital in typescript
export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Function to capatalize first letters of all words in string
export function capitalizeFirstLetterOfAllWords(str: string) {
  str = str.toLowerCase()
  return str
    .split(' ')
    .map((word) => capitalizeFirstLetter(word))
    .join(' ')
}

// function to remove undefined values from array
export const removeUndefinedFromArray = (array: any): [] => {
  return array.filter((item: any) => item !== undefined)
}

// function to convert array of string to comma separated string
export const convertArrayToString = (array: any): string => {
  return array.join(',')
}

export const getFullName = (
  family_name: string,
  given_name: string
): string => {
  return capitalizeFirstLetterOfAllWords(`${family_name}, ${given_name}`)
}

export const formatIhiNumber = (ihi_number: string) => {
  return ihi_number.replace(/(\d{4})/g, '$1 ')
}

// function to format date : 19880418 to  18/04/1988 (34 yrs)
export function formatDate(dateString: string, includeYears = false) {
  const date = moment(dateString, 'YYYYMMDD')
  let formattedDate = date.format('DD-MM-YYYY')

  if (includeYears) {
    const years = moment().diff(date, 'years')
    formattedDate += ` (${years} yrs)`
  }

  return formattedDate
}

// function that takes in date in formate DD/MM/YYYY and returns DD Mon YY
export function formatDatePretty(date: string) {
  const dateObj = new Date(date)
  const month = dateObj.toLocaleString('default', { month: 'short' })
  const day = dateObj.getDate()
  const year = dateObj.getFullYear()
  return `${day} ${month} ${year}`
}

export type ServerResponse = {
  statusCode: number
  data: any
  message: string
}
