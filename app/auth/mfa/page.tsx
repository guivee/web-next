'use client'

import { useContext, useEffect, useState } from 'react'
import { AmplifyUserContext } from '../{components}/useAmplifyUser'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import BrButton from '../../{components}/pm-button'
import { ErrorMessage } from '@hookform/error-message'
import ErrorMsg from '../../{components}/error-msg'
import { LockClosedIcon } from '@heroicons/react/24/solid'
import VerificationInput from 'react-verification-input'
import RememberDeviceSwitch from '../{components}/remember-device-switch'
import AuthCommon from '../{components}/auth-common'

const MfaPage = () => {
  const { errorMessage, confirmMfaCode, userForMfa, rememberDevice } =
    useContext(AmplifyUserContext)

  type FormValues = {
    totp_code: string
    remember_device: boolean
  }
  const defaultValues: FormValues = { totp_code: '', remember_device: false }

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({ defaultValues })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await confirmMfaCode(userForMfa, data.totp_code, data.remember_device)
  }

  const title = 'Two Factor Authentication '
  const description =
    'Please enter the code from your mobile app (eg: Google Authenticator).'
  const DescriptionComponent = () => <div>{description}</div>

  return (
    <>
      <AuthCommon title={title} desc={<DescriptionComponent />}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
          {/* <h2 className="bg-gradient-to-r from-gray-500 to-gray-700 bg-clip-text text-center text-3xl font-bold  text-transparent  dark:from-secondary-900  dark:to-secondary-900">
            Please check your 2FA code
          </h2>
          <p className="max-w mt-2 text-center text-sm  text-gray-600">
            or
            <a
              onClick={gotoLogin}
              href="#"
              className="pl-2 font-medium text-secondary-700 underline hover:text-secondary-900 dark:text-secondary-500"
            >
              Try different email?
            </a>
          </p> */}

          <div className="">
            <div className="flex items-center">
              <LockClosedIcon className="mb-2 mr-2 h-5 w-5 dark:text-gray-600" />
              <label htmlFor="password" className="br-label">
                Email verification code
              </label>
            </div>

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

          <div>
            <BrButton
              isSubmitting={isSubmitting}
              type="submit"
              name={isSubmitting ? 'Submitting' : 'Submit'}
              isActive={true}
              testIdPrefix="submit"
            />
            {errorMessage && (
              <div className="text-sm text-secondary-700"> {errorMessage} </div>
            )}
          </div>

          <div>
            <Controller
              name="remember_device"
              control={control}
              render={({ field: { onChange, value } }) => (
                <RememberDeviceSwitch onChange={onChange} value={value} />
              )}
            />
          </div>
        </form>
      </AuthCommon>
    </>
  )
}
export default MfaPage
