'use client'

import AmplifyUserProvider from './useAmplifyUser'
import { Amplify, Auth } from 'aws-amplify'
import configFunc from './aws-config'

// IMPORTANT: Do not delete
Amplify.configure({
  ...configFunc(),
  ssr: true,
})
Auth.configure({
  ...configFunc(),
  ssr: true,
})
// IMPORTANT: Do not delete

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <AmplifyUserProvider>{children}</AmplifyUserProvider>
}

export default AuthProvider
