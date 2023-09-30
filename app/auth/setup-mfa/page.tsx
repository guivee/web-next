'use client'

import { Auth } from 'aws-amplify'
import { useContext, useEffect, useState } from 'react'
import { AmplifyUserContext } from '../{components}/useAmplifyUser'
import { QRCodeSVG } from 'qrcode.react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import Spinner from '../../{components}/spinner'
import BrButton from '../../{components}/pm-button'
import { ErrorMessage } from '@hookform/error-message'
import ErrorMsg from '../../{components}/error-msg'
import VerificationInput from 'react-verification-input'
import AuthCommon from '../{components}/auth-common'

const SetupMfaPage = () => {
  const { errorMessage, verifyMfaCode } = useContext(AmplifyUserContext)

  const [qrCodeStr, setQrCodeStr] = useState<string>()
  const [signedInUser, setSignedInUser] = useState(undefined)

  async function getCode() {
    if (!signedInUser) {
      let user = await Auth.currentAuthenticatedUser()
      setSignedInUser(user)
      let code = await Auth.setupTOTP(user)

      //create string for QRCodeSVG
      let str = `otpauth://totp/${user.attributes.email}?secret=${code}&issuer=Parchment`
      setQrCodeStr(str)
    }
  }

  useEffect(() => {
    if (!qrCodeStr) getCode()
  }, [qrCodeStr])

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>()

  type FormValues = {
    totp_code: string
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await verifyMfaCode(signedInUser, data.totp_code)
  }

  const title = 'Setup Two Factor Authentication'
  const description =
    'Please scan the below QR code using an app on your phone (eg. Google Authenticator) and enter the code.'
  const DescriptionComponent = () => <div>{description}</div>
  if (!qrCodeStr) return <>No user found</>

  return (
    <>
      <AuthCommon title={title} desc={<DescriptionComponent />}>
        <div className="mx-auto flex justify-center">
          <QRCodeSVG value={qrCodeStr} className="h-36 w-36 shadow-xl" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="pt-4 pb-2">
            <label htmlFor="totp_code" className="br-label mt-4">
              Enter code from your MFA app
            </label>
            <div className="flex justify-center py-2">
              <div>
                <Controller
                  name="totp_code"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <VerificationInput
                      value={value}
                      onChange={onChange}
                      autoFocus={true}
                      removeDefaultStyles
                      placeholder=""
                      validChars="0-9"
                      classNames={{
                        container: 'container',
                        character: 'character',
                        characterInactive: 'character--inactive',
                        characterSelected: 'character--selected',
                      }}
                    />
                  )}
                />
              </div>
            </div>
            <ErrorMessage
              errors={errors}
              name="totp_code"
              render={({ message }) => <ErrorMsg message={message} />}
            />
          </div>
          <BrButton
            isSubmitting={isSubmitting}
            type="submit"
            name={isSubmitting ? 'Submiting' : ' Submit'}
            isActive={true}
            testIdPrefix="submit"
          />
          {errorMessage && (
            <div className="text-sm text-red-700"> {errorMessage} </div>
          )}
        </form>
      </AuthCommon>
    </>
  )
}

export default SetupMfaPage
