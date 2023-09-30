'use client'
import { useRef, useEffect, useContext } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import Spinner from '../../{components}/spinner'
import BrButton from '../../{components}/pm-button'
import { ErrorMessage } from '@hookform/error-message'
import ErrorMsg from '../../{components}/error-msg'
import { LockClosedIcon } from '@heroicons/react/24/solid'
import VerificationInput from 'react-verification-input'
import { useRouter } from 'next/navigation'
import useAmplifyUser, { AmplifyUserContext } from './useAmplifyUser'

export default function ConfirmForm({ email }: { email: string }) {
  const { confirmCode, errorMessage, resendConfirmCode } =
    useContext(AmplifyUserContext)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>()

  type FormValues = {
    email: string
    code: string
  }

  const resendCodeHandler = async () => {
    //TODO: get email from form
    await resendConfirmCode(email)
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    let user_email = email

    if (email == 'undefined' || email == '') {
      user_email = data.email
    }

    await confirmCode(user_email, data.code)
  }

  return (
    <div>
      {isSubmitting && <Spinner />}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="">
          <EmailComponent email={email} register={register} errors={errors} />

          <div className="flex justify-center py-2">
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

        <div className="relative flex-row space-y-4">
          <div>
            <BrButton
              isSubmitting={isSubmitting}
              type="submit"
              name={isSubmitting ? 'Submitting' : 'Submit'}
              isActive={true}
              testIdPrefix="submit"
            />
            {errorMessage && (
              <div className="text-sm text-neutral-700"> {errorMessage} </div>
            )}
          </div>
          <div
            className=" br-label mx-auto mt-3 flex cursor-pointer justify-center rounded-lg bg-gray-100 p-1 py-2"
            onClick={resendCodeHandler}
          >
            resend code?
          </div>
        </div>
      </form>
    </div>
  )
}

function EmailComponent({
  email,
  register,
  errors,
}: {
  email: string
  register: any
  errors: any
}) {
  if (email === 'undefined') {
    return (
      <div className="w-full flex-row  space-y-6">
        <div>
          <label htmlFor="email" className="br-label ">
            Email Address
          </label>
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
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <ErrorMsg message={message} />}
          />
        </div>
        <div className="flex w-full items-center">
          <LockClosedIcon className="mb-2 mr-2 h-5 w-5 dark:text-gray-600" />
          <label htmlFor="password" className="br-label">
            Email verification code
          </label>
        </div>
      </div>
    )
  } else
    return (
      <div className="flex w-full items-center">
        <LockClosedIcon className="mb-2 mr-2 h-5 w-5 dark:text-gray-600" />
        <label htmlFor="password" className="br-label">
          Email verification code for {email}
        </label>
      </div>
    )
}
