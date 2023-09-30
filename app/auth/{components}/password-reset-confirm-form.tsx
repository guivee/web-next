'use client'
import { Auth } from 'aws-amplify'
import { useContext, useEffect, useState } from 'react'
import { AmplifyUserContext } from '../{components}/useAmplifyUser'
import QRCode from 'qrcode.react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import Spinner from '../../{components}/spinner'
import BrButton from '../../{components}/pm-button'
import { ErrorMessage } from '@hookform/error-message'
import ErrorMsg from '../../{components}/error-msg'
import { LockClosedIcon } from '@heroicons/react/24/solid'
import VerificationInput from 'react-verification-input'
import { useRouter } from 'next/navigation'
import { SIGNIN_LINK } from '../../{lib}/links'

const PasswordResetConfirmForm = ({
  setToggle,
  email,
}: {
  setToggle?: any
  email: string
}) => {
  const { errorMessage, passwordResetConfirm, userForMfa } =
    useContext(AmplifyUserContext)

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>()

  const router = useRouter()

  type FormValues = {
    email: string
    code: string
    password: string
  }

  const gotoLogin = () => {
    router.push(SIGNIN_LINK)

    if (setToggle) setToggle(false)
  }

  // useEffect(() => {
  //   setValue('email', email)
  // }, [])

  const onSubmit: SubmitHandler<FormValues> = async ({
    email,
    code,
    password,
  }) => {
    await passwordResetConfirm(email, code, password).then(() => {
      gotoLogin()
    })
  }

  const EmailComponent = ({ email }: { email: string }) => {
    // if (!email)
    return (
      <input
        {...register('email', {
          required: 'Required',
          maxLength: { value: 50, message: 'Length too long' },
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Please enter a valid email',
          },
        })}
        className="br-input"
      />
    )

    // else
    // return (
    //   <input
    //     name="email"
    //     value={email}
    //     readOnly
    //     className="w-full bg-gray-50"
    //   />
    // )
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex-row space-y-8">
        <div>
          <label htmlFor="email" className="br-label mt-4">
            Email
          </label>
          <EmailComponent email={email} />
        </div>
        <div className="">
          <div className="flex items-center">
            <LockClosedIcon className="mb-2 mr-2 h-5 w-5 dark:text-gray-600" />
            <label htmlFor="password" className="br-label">
              Email verification code
            </label>
          </div>

          <div className="flex justify-center ">
            <div>
              <Controller
                name="code"
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
            name="code"
            render={({ message }) => <ErrorMsg message={message} />}
          />
        </div>

        <div>
          <label htmlFor="password" className="br-label mt-4">
            Password
          </label>
          <input
            {...register('password', {
              required: 'Required',
              maxLength: { value: 30, message: 'Length too long' },
            })}
            className="br-input"
            type="password"
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <ErrorMsg message={message} />}
          />
        </div>

        <BrButton
          isSubmitting={isSubmitting}
          type="submit"
          name={isSubmitting ? 'Submitting' : 'Submit'}
          isActive={true}
          testIdPrefix="submit"
        />
        {errorMessage && (
          <div className="text-sm text-red-700"> {errorMessage} </div>
        )}
      </form>
    </>
  )
}

export default PasswordResetConfirmForm
