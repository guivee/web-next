'use client'
import LoginForm from '../{components}/login-form'
import AuthCommon from '../{components}/auth-common'
import { useRouter } from 'next/navigation'
import { SIGNUP_LINK } from '../../{lib}/links'

const LoginPage = () => {
  const router = useRouter()

  const gotoLink = () => {
    router.push(SIGNUP_LINK)
  }
  const title = 'Login to Parchment'
  const DescriptionComponent = () => {
    return (
      <>
        <div onClick={gotoLink}>
          If you dont already have an account, please
          <a className="ml-1 cursor-pointer  underline hover:text-neutral-700">
            click here to Signup.
          </a>
        </div>
      </>
    )
  }

  return (
    <AuthCommon title={title} desc={<DescriptionComponent />}>
      <LoginForm />
    </AuthCommon>
  )
}
export default LoginPage
