'use client'
import { useState, useEffect, useContext, createContext, useMemo } from 'react'
import { AmplifyUserContext } from './useAmplifyUser'
import { useLDClient } from 'launchdarkly-react-client-sdk'
export const UserContext = createContext(null)

const UserProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState(null)
  const [idToken, setIdtoken] = useState(null)
  const ldClient = useLDClient()
  const [loading, setLoading] = useState(true)
  const [triggerApiFetch, setTriggerApiFetch] = useState(false)
  const { amplifyUser, refreshUser, loggedOut } = useContext(AmplifyUserContext)

  const mutate = () => {
    setTriggerApiFetch(!triggerApiFetch)
    refreshUser()
  }

  useEffect(() => {
    if (!loggedOut && amplifyUser && !amplifyUser.attributes) {
      console.error(
        'Something went wrong during Bakerue authentication. User is loggedIn but attributes are unavailable.'
      )
    }
    let user = null
    setLoading(true)

    // console.log("=-=-=-=-=-= amplifyUser: ", amplifyUser);
    if (amplifyUser && amplifyUser.attributes) {
      user = {
        //@ts-ignore
        full_name: amplifyUser.attributes['full_name'],
        email: amplifyUser.attributes['email'],
        user_id: amplifyUser.attributes['sub'],
        avatar: amplifyUser.attributes['picture'],
      }

      const idToken = amplifyUser?.signInUserSession?.idToken?.jwtToken
      // console.log("----- idToken: ", idToken);
      setIdtoken(idToken)
      setFeatureFlagUser(ldClient, user)

      setLoading(false)
    }
    setUser(user)

    if (loggedOut) {
      setLoading(false)
    }
  }, [amplifyUser, loggedOut])

  const values = { user, mutate, loading, loggedOut, idToken }

  // Finally, return the interface that we want to expose to our other components
  // @ts-ignore
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>
}

export default UserProvider

export const useBrUser = () => {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error(
      '`useUser` hook must be used within a `UserProvider` component'
    )
  }
  return context
}

function setFeatureFlagUser(ldClient: any, user: any) {
  if (!user || !ldClient) return

  ldClient.identify({
    key: user.user_id,
    email: user.email,
    user_type: user.user_type,
  })
}
