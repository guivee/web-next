'use client'
import { useRef, useEffect, useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Spinner from '../../{components}/spinner'
import BrButton from '../../{components}/pm-button'
import { ErrorMessage } from '@hookform/error-message'
import ErrorMsg from '../../{components}/error-msg'
import { AmplifyUserContext } from './useAmplifyUser'

export default function SignupForm() {
  const { signUp, toggleSignupLoginForm, errorMessage } =
    useContext(AmplifyUserContext)
  const fullNameRef = useRef(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>()

  type FormValues = {
    full_name: string
    email: string
    password: string
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await signUp(data)
  }

  return (
    <div>
      {isSubmitting && <Spinner />}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="full_name" className="br-label">
            Full Name
          </label>
          <input
            {...register('full_name', {
              required: 'Required',
              maxLength: { value: 150, message: 'Length too long' },
              minLength: { value: 1, message: 'Please enter your name' },
            })}
            className="br-input"
          />
          <ErrorMessage
            errors={errors}
            name="full_name"
            render={({ message }) => <ErrorMsg message={message} />}
          />
        </div>

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

        <div>
          <label htmlFor="password" className="br-label ">
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
          name={isSubmitting ? ' Sign up' : ' Sign up'}
          isActive={true}
          testIdPrefix="submit"
        />
        {errorMessage && (
          <div className="text-sm text-neutral-700"> {errorMessage} </div>
        )}
      </form>
    </div>
  )
}
