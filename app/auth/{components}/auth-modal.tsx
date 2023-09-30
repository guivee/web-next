import { useContext, useEffect, useState } from 'react'
import Spinner from './../../{components}/spinner'
import ConfirmForm from './confirm-form'
import LoginForm from './login-form'
import SignupForm from './signup-form'
import { Action, AmplifyUserContext, LoginFormOptions } from './useAmplifyUser'

function AuthModal({ redirect_url }: { redirect_url: string }) {
  const { formState, dispatch } = useContext(AmplifyUserContext)

  useEffect(() => {
    dispatch({ type: Action.SHOW_SIGNUP_MODAL })
    dispatch({ type: Action.UPDATE_REDIRECT_URL, payload: { redirect_url } })
  }, [])

  if (!formState) return <ConfirmForm email={''} />

  if (formState.loginFormType === LoginFormOptions.SIGNUP_FORM)
    return <SignupForm />
  else if (formState.loginFormType === LoginFormOptions.CONFIRM_CODE_FORM)
    return <ConfirmForm email={''} />
  else if (formState.loginFormType === LoginFormOptions.LOGIN_FORM)
    return <LoginForm />
}

export default AuthModal
