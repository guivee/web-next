// @ts-nocheck --------------------------------------------- IGNORING TS ERRORS AS WE DONT USE THIS FILE. TODO
import axios, { AxiosResponse } from 'axios'
import { getIdToken } from '../auth/auth-utils'
import { IS3itemBody, IS3item, IUserBody, IimageUploadGrid } from './types'
import { axiosErrorHandler } from './utils'

export const updateUserFetcher = async (
  body: IUserBody,
  images: IimageUploadGrid
) => {
  return new Promise((resolve) => {
    invokeUserServiceApi(body, 'POST').then((data) => {
      const user = data?.result
      uploadPictures(user, images, resolve)
    })
  })
}

export const updateUser = async (body) => {
  return await invokeUserServiceApi(body, 'POST')
}

const uploadPictures = (user: any, images: IimageUploadGrid, resolve: any) => {
  let imagePathList = []

  if (!images) throw 'Images is null'

  const localImages = images.newImageList

  let count = localImages ? localImages.length : 0

  if (images.currentImageList)
    imagePathList = imagePathList.concat(images.currentImageList)

  // User added new images during update
  if (localImages && localImages.length > 0)
    Promise.all(
      localImages.map(async (image) => {
        console.log('image: ', image)
        await generatePresignedUrlApi(user.user_id).then((data) => {
          uploadUsingPreSignedUrlApi(data, image).then(() => {
            imagePathList.push(data.filePath)

            count--
            // Create URLs for all images then update db all at once
            if (count == 0) {
              updateImagePaths(user, imagePathList, resolve)
            }
          })
        })
      })
    )
  // User may have just deleted some existing images during update
  // TODO: may be skip this if the existing images were untouched. Will help reduce calls to api
  else {
    updateImagePaths(user, imagePathList, resolve)
  }
}

/**
 * @deprecated The method should not be used. Migrated top /api
 */
const invokeUserService = async (body, method = 'PUT') => {
  const requestOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': userServiceApiKey,
    },
    body: JSON.stringify(body),
  }

  const res = await fetch(userServiceUrl, requestOptions)

  if (!res.ok) {
    const error = new Error('An error occurred while calling user service.')
    throw error
  }

  return res.json()
}

const invokeUserServiceApi = async (
  body,
  method: 'GET' | 'PUT' | 'POST' | 'DELETE' = 'PUT'
) => {
  let endpoint
  let result
  if (method == 'POST') endpoint = `/api/protected/update-user`

  const config = {
    method: method,
    url: endpoint,
    data: body,
  }

  await axios(config)
    .then(({ data }) => {
      result = data
    })
    .catch((error) => {
      axiosErrorHandler('invokeUserServiceApi', error)
    })

  return result
}

const updateUserImagesApi = async (body) => {
  let endpoint
  let result

  endpoint = `/api/protected/update-user-images`
  const method: 'POST' = 'POST'

  const config = {
    method: method,
    url: endpoint,
    data: body,
  }

  await axios(config)
    .then(({ data }) => {
      result = data
    })
    .catch((error) => {
      axiosErrorHandler('invokeUserServiceApi', error)
    })

  return result
}

const updateImagePaths = (user, imagePathList, resolve) => {
  console.log('imagePathList: ', imagePathList)
  imagePathList.sort()
  let body = {
    item: {
      user_id: user.user_id,
      images: imagePathList,
      email: user.email,
    },
  }

  updateUserImagesApi(body).then((data) => {
    return resolve(data)
  })
}

/**
 * @deprecated The method should not be used. Migrated top /api
 */
const generatePresignedUrl = async (sellerId) => {
  // Get pre-signed Url
  const itemBody = {
    seller_id: sellerId,
    is_avatar: true,
  }

  const body = {}
  body['item'] = itemBody

  let requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': preSignedApiKey,
    },
    body: JSON.stringify(body),
  }

  const res = await fetch(preSignedUrl, requestOptions)

  if (!res.ok) {
    const error = new Error(
      'An error occurred while generating the presigned url.'
    )
    throw error
  }

  return res.json()
}

const generatePresignedUrlApi = async (sellerId) => {
  // Get pre-signed Url
  const item: IS3item = {
    user_id: sellerId,
    is_avatar: true,
  }

  const method: 'PUT' = 'PUT'

  const body: IS3itemBody = { item }

  let endpoint = `/api/s3-url`

  let result
  const config = {
    method: method,
    url: endpoint,
    data: body,
  }

  await axios(config)
    .then(({ data }) => {
      result = data
    })
    .catch((error) => {
      axiosErrorHandler('generatePresignedUrlApi', error)
    })

  return result
}

/**
 * @deprecated The method should not be used.
 */
const uploadUsingPreSignedUrl = async (data, file) => {
  // Use Pres-signed url to upload file
  let form = new FormData()
  Object.keys(data.preSignedMetadata.fields).forEach((key) =>
    form.append(key, data.preSignedMetadata.fields[key])
  )
  form.append('file', file)
  await fetch(data.preSignedMetadata.url, { method: 'POST', body: form })
}

const uploadUsingPreSignedUrlApi = async (data, file) => {
  // Use Pres-signed url to upload file
  let form = new FormData()
  Object.keys(data.preSignedMetadata.fields).forEach((key) => {
    form.append(key, data.preSignedMetadata.fields[key])
  })
  form.append('file', file)

  let result
  const method: 'POST' = 'POST'
  let endpoint = data.preSignedMetadata.url
  const config = {
    method: method,
    url: endpoint,
    data: form,
  }

  await axios(config)
    .then(({ data }) => {
      result = data
    })
    .catch((error) => {
      axiosErrorHandler('uploadUsingPreSignedUrlApi', error)
    })

  return result
}

export const getUserDetails = async () => {
  const endpoint = `${userServiceUrl}/userDetails`
  let result

  const idToken = await getIdToken()

  const headers = { Authorization: idToken }

  await axios
    .get(endpoint, { headers })
    .then(({ data }) => {
      result = data
    })
    .catch((error) => {
      axiosErrorHandler('getUserDetails', error)
    })

  return result
}

export const getSellersByZipcode = async (zipcode: string) => {
  const endpoint = `${userServiceUrl}/sellersByZipcode/${zipcode}`
  let result

  const headers = { 'X-API-Key': userServiceApiKey }

  await axios
    .get(endpoint, { headers })
    .then(({ data }) => {
      console.log('-------', data)

      result = data
    })
    .catch((error) => {
      axiosErrorHandler('getSellersByZipcode', error)
    })

  return result
}

export const getSellerDetailsByUsername = async (username: string) => {
  const endpoint = `${userServiceUrl}/userDetailsByUsername/${username}?user_type=seller`
  let result

  const headers = { 'X-API-Key': userServiceApiKey }
  await axios
    .get(endpoint, { headers })
    .then(({ data }) => {
      result = data
    })
    .catch((error) => {
      axiosErrorHandler('getSellerDetailsByUsername', error)
    })

  return result
}

export const getUserDetailsByUserId = async (userId: string) => {
  const endpoint = `${userServiceUrl}/userDetailsByUserId/${userId}`
  let result
  const idToken = await getIdToken()

  const headers = { Authorization: idToken }

  await axios
    .get(endpoint, { headers })
    .then(({ data }) => {
      result = data
    })
    .catch((error) => {
      axiosErrorHandler('getUserDetailsByUserId', error)
    })

  return result
}

// This method is always called from SERVER side
export const getAllSellers = async () => {
  const endpoint = `${userServiceUrl}/?user_type=seller`
  let result

  const headers = { 'X-API-Key': userServiceApiKey }

  await axios
    .get(endpoint, { headers })
    .then(({ data }) => {
      result = data
    })
    .catch((error) => {
      axiosErrorHandler('getAllSellers', error)
    })

  if (result) return result.Items

  return null
}

export const checkUserApi = async () => {
  const endpoint = `/api/protected/check-user`
  let result
  const method: 'POST' = 'POST'

  const config = {
    method: method,
    url: endpoint,
  }

  await axios(config)
    .then(({ data }) => {
      result = data
    })
    .catch((error) => {
      axiosErrorHandler('checkUserApi', error)
    })

  return result
}

export const chatApi = async (user_id) => {
  const endpoint = `/api/protected/chat/token/${user_id}`

  let result
  const method: 'PUT' = 'PUT'

  const config = {
    method: method,
    url: endpoint,
  }

  await axios(config)
    .then(({ data }) => {
      result = data
    })
    .catch((error) => {
      axiosErrorHandler('chatApi', error)
    })

  return result
}

export const saveEmailToWaitlistApi = async ({ email }) => {
  const endpoint = `/api/waitlist`
  let result
  const method: 'PUT' = 'PUT'
  const body = {
    emails: [email],
  }

  const config = {
    method: method,
    url: endpoint,
    data: body,
  }

  let resp
  await axios(config)
    .then((response: AxiosResponse) => {
      console.log('response: ', response)
      resp = response
    })
    .catch((error) => {
      axiosErrorHandler('saveEmailToWaitlistApi', error)
    })

  return resp
}

export const getAvatar = (user, showPlaceholder = true) => {
  const placeholder = showPlaceholder ? '/avatar-example.png' : undefined
  const avatar = user && user.avatar ? user.avatar : placeholder

  return avatar
}
