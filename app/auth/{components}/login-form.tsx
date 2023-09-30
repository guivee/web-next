'use client'
import { useRef, useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Spinner from '../../{components}/spinner'
import BrButton from '../../{components}/pm-button'
import { ErrorMessage } from '@hookform/error-message'
import ErrorMsg from '../../{components}/error-msg'
import { AmplifyUserContext } from './useAmplifyUser'
import { RESET_LINK } from '../../{lib}/links'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const emailRef = useRef(null)
  const { login, toggleSignupLoginForm, errorMessage } =
    useContext(AmplifyUserContext)

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>()

  const { ref, ...rest } = register('email', {
    required: 'Required',
    maxLength: { value: 50, message: 'Length too long' },
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'Please enter a valid email',
    },
  })

  type FormValues = {
    email: string
    password: string
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await login(data)
  }

  const router = useRouter()

  const gotoReset = () => {
    router.push(RESET_LINK)
  }

  return (
    <div>
      {isSubmitting && <Spinner />}

      {true && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="br-label">
              Email Address
            </label>
            <input
              className="br-input"
              {...rest}
              name="email"
              ref={(e) => {
                ref(e)
                // emailRef.current = e // you can still assign to ref
              }}
            />
            <ErrorMessage
              errors={errors}
              name="email"
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

          <div>
            <BrButton
              isSubmitting={isSubmitting}
              type="submit"
              name={isSubmitting ? ' Sign in' : ' Sign in'}
              isActive={true}
              testIdPrefix="submit"
            />
            {errorMessage && (
              <div className="text-sm text-neutral-700"> {errorMessage} </div>
            )}
            <div
              className=" mt-1 cursor-pointer text-xs text-neutral-600"
              onClick={gotoReset}
            >
              forgot password?
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
