'use client'
import { useState, useEffect, useMemo, createContext, useReducer } from 'react'
import { Auth, Hub, Amplify } from 'aws-amplify'
import { useRouter } from 'next/navigation'
import { HubPayload } from '@aws-amplify/core'
import {
  INVALID_SIGNUP_FIELDS,
  INVALID_LOGIN_FIELDS,
  AUTH_FAILURE,
  INVALID_PASSWORD_RESET_FIELDS,
} from '../../{lib}/constants'

import {
  SIGNUP_LINK,
  MFA_LINK,
  HOME_LINK,
  SETUP_MFA_LINK,
  SIGNIN_LINK,
  CONFIRM_LINK,
  DASHBOARD_LINK,
} from '../../{lib}/links'

type ISignup = (
  {
    full_name,
    email,
    password,
    access_roles,
    organization_name,
    organization_id,
  }: {
    full_name: string
    email: string
    password: string
    access_roles?: string // IMP: Cognito needs this to be a string
    organization_name?: string
    organization_id?: string
  },
  isInviteFlow?: boolean
) => Promise<any>

type ILogin = ({
  email,
  password,
}: {
  email: string
  password: string
}) => Promise<any>

type IConfirmCode = (email: string, code: string) => Promise<any>
type IResendConfirmCode = (email: string) => Promise<any>

type IConfirmMfaCode = (
  user: any,
  mfa_code: string,
  remember_device: boolean
) => Promise<any>
type IVerifyMfaCode = (user: any, totp_Code: string) => Promise<any>
type IPasswordResetInit = (email: string) => Promise<any>
type IPasswordResetConfirm = (
  email: string,
  code: string,
  password: string
) => Promise<any>
type IRememberDevice = () => Promise<any>
type IForgetDevice = () => Promise<any>
type IFetchDevices = () => Promise<any>

export type IAmplifyUserContext = {
  amplifyUser: any
  userForMfa: any
  errorMessage: string
  signUp: ISignup
  confirmCode: IConfirmCode
  resendConfirmCode: IResendConfirmCode
  confirmMfaCode: IConfirmMfaCode
  verifyMfaCode: IVerifyMfaCode
  passwordResetInit: IPasswordResetInit
  passwordResetConfirm: IPasswordResetConfirm
  rememberDevice: IRememberDevice
  forgetDevice: IForgetDevice
  fetchDevices: IFetchDevices
  login: ILogin
  logout: any
  amplifyUserLoading: boolean
  dispatch: any
  formState: any
  toggleSignupLoginForm: any
  loggedOut: any
  refreshUser: any
}

// @ts-ignore
export const AmplifyUserContext = createContext<IAmplifyUserContext>(null)

export enum LoginFormOptions {
  SIGNUP_FORM = 'SIGNUP_FORM',
  LOGIN_FORM = 'LOGIN_FORM',
  SIGNUP_FORM_PAGE = 'SIGNUP_FORM_PAGE',
  LOGIN_FORM_PAGE = 'LOGIN_FORM_PAGE',
  CONFIRM_CODE_FORM = 'CONFIRM_CODE_FORM',
  CONFIRM_FORM_PAGE = 'CONFIRM_FORM_PAGE',
}

export const enum Action {
  SHOW_SIGNUP_MODAL = 'SHOW_SIGNUP_MODAL',
  SHOW_CONFIRM_MODAL = 'SHOW_CONFIRM_MODAL',
  SHOW_SIGNUP_PAGE = 'SHOW_SIGNUP_PAGE',
  SHOW_LOGIN_PAGE = 'SHOW_LOGIN_PAGE',
  SHOW_CONFIRM_PAGE = 'SHOW_CONFIRM_PAGE',
  UPDATE_EMAIL = 'UPDATE_EMAIL',
  UPDATE_USER_METADATA = 'UPDATE_USER_METADATA',
  UPDATE_REDIRECT_URL = 'UPDATE_REDIRECT_URL',
  SHOW_LOGIN_MODAL = 'SHOW_LOGIN_MODAL',
  REDIRECT = 'REDIRECT',
  SHOW_ERROR = 'SHOW_ERROR',
}

const initializeFormState = {
  isModalLayout: false,
  redirect_url: DASHBOARD_LINK,
  loginFormType: LoginFormOptions.SIGNUP_FORM,
  email: undefined,
  user_metadata: {
    user_type: undefined,
    full_name: undefined,
  },
}
const AmplifyUserProvider = ({ children }: { children: any }) => {
  const [amplifyUser, setAmplifyUser] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [amplifyUserLoading, setAmplifyUserLoading] = useState(true)
  const [loggedOut, setloggedOut] = useState(true)
  const [userForMfa, setUserForMfa] = useState()

  const router = useRouter()

  const [formState, dispatch] = useReducer(reducer, initializeFormState)

  useEffect(() => {
    refreshSession()
    refreshUser() //TODO: not needed maybe
    HubListener()
  }, [])

  const refreshSession = async () => {
    console.log('Refreshing Session...')
    await Auth.currentSession()
      .then((resp) => {})
      .catch((err) => {
        // This will always be called when the user is not logged in
        // dispatch({
        //   type: Action.REDIRECT,
        //   payload: { redirect_url: SIGNIN_LINK },
        // })
      })
  }

  const refreshUser = async () => {
    await Auth.currentAuthenticatedUser()
      .then((user) => {
        setAmplifyUser(user)
        setAmplifyUserLoading(false)
        setloggedOut(false)
      })
      .catch(() => {
        setAmplifyUser({})
        setAmplifyUserLoading(false)
        setloggedOut(true)
      })

    // IMP: Call currentUserInfo cause the attributes are always current
    await Auth.currentUserInfo()
      .then(({ attributes }) => {
        setAmplifyUser((amplifyUser) => ({
          ...amplifyUser,
          attributes,
        }))
        setAmplifyUserLoading(false)
        setloggedOut(false)
      })
      .catch(() => {
        setAmplifyUser({})
        setAmplifyUserLoading(false)
        setloggedOut(true)
      })
  }

  const signUp: ISignup = async (
    {
      full_name,
      email,
      password,
      access_roles,
      organization_name,
      organization_id,
    },
    isInviteFlow = false
  ) => {
    if (!full_name || !email || !password) {
      throw new Error(INVALID_SIGNUP_FIELDS)
    }

    const parms = {
      name: full_name.toLowerCase(),
      password,
      email: email.toLowerCase(),
      username: email.toLowerCase(),
      attributes: {
        name: full_name.toLowerCase(),
        'custom:access_roles': access_roles,
        'custom:organization_name': organization_name,
        'custom:organization_id': organization_id,
      },
      autoSignIn: {
        enabled: !isInviteFlow, // Dont auto sign in for invite flow
      },
    }

    await Auth.signUp(parms)
      .then(async ({ user, userConfirmed, userSub }) => {
        if (!userConfirmed) {
          dispatch({ type: Action.UPDATE_EMAIL, payload: { email } })

          if (isInviteFlow) {
            // Dont redirect anywhere for invite flow
          } else if (!formState.isModalLayout) {
            dispatch({ type: Action.SHOW_CONFIRM_PAGE })
          } else {
            dispatch({ type: Action.SHOW_CONFIRM_MODAL })
          }
        } else {
          // If user is confirmed, then it means the user is signing up from the invite flow.
          //In this case, we need to send user a reset password email to validate their account
          await passwordResetInit(email)
        }
      })
      .catch((err) => {
        throw new Error(err.message)
      })
  }

  const confirmCode: IConfirmCode = async (email, code) => {
    await Auth.confirmSignUp(email, code)
      .then((resp) => {})
      .catch((err) => {
        handleAuthFailure(err)
      })
  }

  const resendConfirmCode: IResendConfirmCode = async (email) => {
    await Auth.resendSignUp(email)
      .then()
      .catch((err) => {
        handleAuthFailure(err)
      })
  }

  const confirmMfaCode: IConfirmMfaCode = async (
    user,
    mfa_code,
    remember_device
  ) => {
    await Auth.confirmSignIn(user, mfa_code, 'SOFTWARE_TOKEN_MFA')
      .then((resp) => {
        dispatch({
          type: Action.UPDATE_REDIRECT_URL,
          payload: { redirect_url: HOME_LINK },
        })

        if (remember_device) {
          rememberDevice()
        }
      })
      .catch((err) => {
        handleAuthFailure(err)
      })
  }

  const verifyMfaCode: IVerifyMfaCode = async (user, totp_code) => {
    await Auth.verifyTotpToken(user, totp_code)
      .then(() => {
        // don't forget to set TOTP as the preferred MFA method
        Auth.setPreferredMFA(user, 'TOTP')
        // ...
      })
      .catch((err) => {
        // Token is not verified
        handleAuthFailure(err)
      })
  }

  const login: ILogin = async ({ email, password }) => {
    if (!email || !password) {
      throw new Error(INVALID_LOGIN_FIELDS)
    }

    // // wait for 5 seconds
    // await new Promise((resolve) => setTimeout(resolve, 5000))

    await Auth.signIn(email.toLowerCase(), password)
      .then((user) => {
        setUserForMfa(user)

        if (user.preferredMFA === 'NOMFA') {
          dispatch({
            type: Action.REDIRECT,
            payload: { redirect_url: SETUP_MFA_LINK },
          })
        } else if (user.challengeName === 'SOFTWARE_TOKEN_MFA') {
          dispatch({
            type: Action.REDIRECT,
            payload: { redirect_url: MFA_LINK },
          })
        } else {
          dispatch({ type: Action.REDIRECT })
        }
      })
      .catch((err) => {
        handleAuthFailure(err)
      })
  }

  const passwordResetInit: IPasswordResetInit = async (email) => {
    if (!email) {
      throw new Error(INVALID_PASSWORD_RESET_FIELDS)
    }

    // Send confirmation code to user's email
    await Auth.forgotPassword(email.toLowerCase())
      .then()
      .catch((err) => {
        handleAuthFailure(err)
        // console.log('hello err', err)
        // throw Error(err.message)
      })
  }

  const passwordResetConfirm: IPasswordResetConfirm = async (
    email,
    code,
    password
  ) => {
    if (!email || !code || !password) {
      throw new Error(INVALID_PASSWORD_RESET_FIELDS)
    }
    // Send confirmation code to user's email
    await Auth.forgotPasswordSubmit(email.toLowerCase(), code, password)
      .then()
      .catch((err) => {
        handleAuthFailure(err)
      })
  }

  const rememberDevice: IRememberDevice = async () => {
    await Auth.rememberDevice()
      .then()
      .catch((err) => handleAuthFailure(err))
  }

  const forgetDevice: IForgetDevice = async () => {
    const result = await Auth.forgetDevice()
      .then()
      .catch((err) => handleAuthFailure(err))
  }

  const fetchDevices: IFetchDevices = async () => {
    try {
      const result = await Auth.fetchDevices()
      console.log(result)
    } catch (err) {
      console.log('Error fetching devices', err)
    }
  }

  const logout = () =>
    Auth.signOut().then((data) => {
      dispatch({ type: Action.SHOW_LOGIN_PAGE })
      refreshUser()
    })

  const toggleSignupLoginForm = () => {
    switch (formState.loginFormType) {
      case LoginFormOptions.LOGIN_FORM:
        dispatch({ type: Action.SHOW_SIGNUP_MODAL })
        break
      case LoginFormOptions.SIGNUP_FORM:
        dispatch({ type: Action.SHOW_LOGIN_MODAL })
        break
      case LoginFormOptions.LOGIN_FORM_PAGE:
        dispatch({ type: Action.SHOW_SIGNUP_PAGE })
        break
      case LoginFormOptions.SIGNUP_FORM_PAGE:
        dispatch({ type: Action.SHOW_LOGIN_PAGE })
        break
    }
  }

  // @ts-ignore
  function reducer(state, action) {
    let newState = { ...state }

    const { type, payload } = action
    console.log('Dispatching action: ', action)
    switch (type) {
      case Action.SHOW_SIGNUP_MODAL:
        newState = {
          ...state,
          isModalLayout: true,
          loginFormType: LoginFormOptions.SIGNUP_FORM,
        }

        // Reset Error Messsage
        setErrorMessage(null)
        break
      case Action.SHOW_CONFIRM_MODAL:
        newState = {
          ...state,
          isModalLayout: true,
          loginFormType: LoginFormOptions.CONFIRM_CODE_FORM,
        }

        // Reset Error Messsage
        setErrorMessage(null)
        break
      case Action.SHOW_LOGIN_MODAL:
        newState = {
          ...state,
          isModalLayout: true,
          loginFormType: LoginFormOptions.LOGIN_FORM,
        }

        // Reset Error Messsage
        setErrorMessage(null)
        break
      case Action.SHOW_SIGNUP_PAGE:
        newState = {
          ...state,
          isModalLayout: false,
          loginFormType: LoginFormOptions.SIGNUP_FORM_PAGE,
        }

        router.push(SIGNUP_LINK)

        // Reset Error Messsage
        setErrorMessage(null)
        break
      case Action.SHOW_LOGIN_PAGE:
        newState = {
          ...state,
          isModalLayout: false,
          loginFormType: LoginFormOptions.LOGIN_FORM_PAGE,
        }

        // Reset Error Messsage
        setErrorMessage(null)

        router.push(SIGNIN_LINK)
        break
      case Action.SHOW_CONFIRM_PAGE:
        newState = {
          ...state,
          isModalLayout: false,
          loginFormType: LoginFormOptions.CONFIRM_FORM_PAGE,
        }

        // Reset Error Messsage
        setErrorMessage(null)

        router.push(`${CONFIRM_LINK}?email=${newState.email}`)
        break

      case Action.UPDATE_USER_METADATA:
        newState = {
          ...state,
          user_metadata: payload.user_metadata,
        }
        break

      case Action.UPDATE_EMAIL:
        newState = {
          ...state,
          email: payload.email,
        }
        break

      case Action.UPDATE_REDIRECT_URL:
        newState = {
          ...state,
          redirect_url: payload.redirect_url,
        }

        // Reset Error Messsage
        setErrorMessage(null)
        break

      case Action.REDIRECT:
        // If a redirect url was passed in action , use that. Else use default state url

        if (payload?.redirect_url) router.push(payload.redirect_url)
        else router.push(state.redirect_url)

        // Reset Error Messsage
        setErrorMessage(null)
        break

      case Action.SHOW_ERROR:
        setErrorMessage(
          payload ? payload.errorMessage : 'Unknown error occured'
        )
        // throw new Error(payload.errorMessage)
        break
      default:
        throw new Error()
    }
    return newState
  }

  function handleAuthFailure(err: string) {
    const arr = ('' + err).split(':')

    dispatch({
      type: Action.SHOW_ERROR,
      payload: { errorMessage: arr[1].trim() },
    })
  }

  const HubListener = () => {
    Hub.listen('auth', (data) => {
      const { payload } = data
      switch (payload.event) {
        case 'signIn':
          console.log('Signed in')
          refreshUser()
          dispatch({ type: Action.REDIRECT })
          break
        case 'autoSignIn':
          console.log('Auto Signed in')
          break
        case 'autoSignIn_failure':
          console.error('Error: autoSignIn_failure')
          dispatch({ type: Action.SHOW_LOGIN_PAGE })

          break
        case 'confirmSignUp':
          console.log('confirmSignUp')
          break
        case 'signOut':
          console.log('Signed out')
          break
        case 'signIn_failure':
        case 'signUp_failure':
          console.log(AUTH_FAILURE)
          break
        case 'signUp':
          console.log('Signed up')
          break
        case 'confirmSignUp_failure':
          console.log('Error: confirmSignUp_failure')
          break
        case 'forgotPassword':
          console.log('forgotPassword')
          break
        case 'forgotPassword_failure':
          console.log('Error: forgotPassword_failure')
          break
        case 'forgotPasswordSubmit':
          console.log('forgotPasswordSubmit')
          break
        case 'forgotPasswordSubmit_failure':
          console.log('Error: forgotPasswordSubmit_failure')
          break
        case 'signOut_failure':
          console.log('Error: signOut_failure')
          break
        case 'customOAuthState':
          console.log('customOAuthState')
          break
        case 'parsingUrl_failure':
          console.log('Error: parsingUrl_failure')
          break
        case 'cognitoHostedUI':
          console.log('cognitoHostedUI')
          break
        case 'cognitoHostedUI_failure':
          console.log('Error: cognitoHostedUI_failure')
          break
        case 'configured':
          console.log('configured')
          break
        case 'configured_failure':
          console.log('Error: configured_failure')
          break
        case 'signIn_failure':
          console.log('Error: signIn_failure')
          break
        case 'parsingUrl':
          console.log('parsingUrl')
          break
        case 'customOAuthState_failure':
          console.log('Error: customOAuthState_failure')
          break
        case 'cognitoHostedUI_failure':
          console.log('Error: cognitoHostedUI_failure')
          break
        case 'tokenRefresh_failure':
          console.log('Error: tokenRefresh_failure')
          dispatch({ type: Action.SHOW_LOGIN_PAGE })
          break
        case 'tokenRefresh':
          console.log('tokenRefresh')
          refreshSession()

          break

        default:
          return
      }
    })
  }

  // Make sure to not force a re-render on the components that are reading these values,
  // unless the `user` value has changed. This is an optimisation that is mostly needed in cases
  // where the parent of the current component re-renders and thus the current component is forced
  // to re-render as well. If it does, we want to make sure to give the `UserContext.Provider` the
  // same value as long as the user data is the same. If you have multiple other "controller"
  // components or Providers above this component, then this will be a performance booster.
  const values = useMemo(
    () => ({
      amplifyUser,
      signUp,
      confirmCode,
      resendConfirmCode,
      confirmMfaCode,
      verifyMfaCode,
      passwordResetInit,
      passwordResetConfirm,
      rememberDevice,
      forgetDevice,
      fetchDevices,
      login,
      logout,
      errorMessage,
      dispatch,
      formState,
      toggleSignupLoginForm,
      amplifyUserLoading,
      loggedOut,
      refreshUser,
      userForMfa,
    }),
    [amplifyUser, formState, loggedOut, amplifyUserLoading, errorMessage]
  )

  return (
    // @ts-ignore // TODO: look into this
    <AmplifyUserContext.Provider value={values}>
      {children}
    </AmplifyUserContext.Provider>
  )
}

export default AmplifyUserProvider
