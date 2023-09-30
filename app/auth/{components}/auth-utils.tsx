import { Amplify, withSSRContext } from 'aws-amplify'
import { NextApiRequest, NextApiResponse } from 'next/types'
import configFunc from './aws-config'
import { ICallback } from '../../{lib}/types'
import { Auth } from 'aws-amplify'

Amplify.configure({
  ...configFunc(),
  ssr: true,
})

Auth.configure({
  ...configFunc(),
  ssr: true,
})

// export const authHOF = async (
//   functiionName: string,
//   req: NextApiRequest,
//   res: NextApiResponse<any>,
//   callback: ICallback
// ) => {
//   const { Auth } = withSSRContext({ req })

//   await Auth.currentAuthenticatedUser() //Auth.currentSession(): doesnt work when deployed to vercel
//     .then((user) => {
//       const user_id = user.attributes.sub
//       console.log('user_id: ', user_id)
//       callback(functiionName, req, res, user_id)
//     })
//     .catch((err) => {
//       console.log(`Function: ${functiionName}`)
//       console.log(`Error: ${err}`)
//       res.status(401).json({
//         payload: null,
//         status: 'failure',
//         description: 'User not authenticated',
//       })
//     })
// }

// export const brApi = (functiionName, req, res, callback) => {
//   return new Promise(async (resolve) => {
//     console.log(functiionName)
//     await authHOF(functiionName, req, res, callback)
//     return resolve
//   })
// }

export const getIdToken = async () => {
  let idToken = null
  await Auth.currentSession().then((res) => {
    idToken = res.getIdToken().getJwtToken()
  })
  return idToken
}
