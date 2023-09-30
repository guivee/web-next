'use client'
import SignupForm from '../{components}/signup-form'
import AuthCommon from '../{components}/auth-common'
import { useContext, useEffect } from 'react'
import { Action, AmplifyUserContext } from '../{components}/useAmplifyUser'
import { SIGNIN_LINK } from '../../{lib}/links'
import { useRouter } from 'next/navigation'

const SignupPage = () => {
  const { dispatch } = useContext(AmplifyUserContext)
  const router = useRouter()
  const title = 'Signup to Parchment'
  const gotoLink = () => {
    router.push(SIGNIN_LINK)
  }
  const DescriptionComponent = () => {
    return (
      <>
        <div onClick={gotoLink}>
          If you already have an account, please
          <a className="ml-1 cursor-pointer  underline hover:text-neutral-700">
            click here to Login.
          </a>
        </div>
      </>
    )
  }
  return (
    <AuthCommon title={title} desc={<DescriptionComponent />}>
      <SignupForm />
    </AuthCommon>
  )
}

export default SignupPage
