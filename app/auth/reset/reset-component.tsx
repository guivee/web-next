'use client'
import { useState } from 'react'
import PasswordResetInitForm from '../{components}/password-reset-init-form'
import PasswordResetConfirmForm from '../{components}/password-reset-confirm-form'
import AuthCommon from '../{components}/auth-common'

const ResetComponent = () => {
  const [toggle, setToggle] = useState(false)
  const [email, setEmail] = useState<string>('')

  const title = 'Reset password'
  const description =
    'Once your email has been submitted, a reset code will be sent to you, which is needed on the next screen along with new password.'
  const DescriptionComponent = () => <div>{description}</div>
  return (
    <>
      <AuthCommon title={title} desc={<DescriptionComponent />}>
        {!toggle && (
          <PasswordResetInitForm setEmail={setEmail} setToggle={setToggle} />
        )}
        {toggle && (
          <PasswordResetConfirmForm email={email} setToggle={setToggle} />
        )}
      </AuthCommon>
    </>
  )
}

export default ResetComponent
