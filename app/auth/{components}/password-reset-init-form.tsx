import { Auth } from 'aws-amplify'
import { useContext, useEffect, useState } from 'react'
import { AmplifyUserContext } from '../{components}/useAmplifyUser'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import BrButton from '../../{components}/pm-button'
import { ErrorMessage } from '@hookform/error-message'
import ErrorMsg from '../../{components}/error-msg'

const PasswordResetInitForm = ({
  setToggle,
  setEmail,
}: {
  setToggle: any
  setEmail: any
}) => {
  const { errorMessage, passwordResetInit, userForMfa } =
    useContext(AmplifyUserContext)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>()

  type FormValues = {
    email: string
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await passwordResetInit(data.email)
      .then(() => {
        setEmail(data.email)
        setToggle(true)
      })
      .catch((err) => {
        console.log('err---', err)
      })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex-row space-y-8">
        <div>
          <label htmlFor="email" className="br-label mt-4">
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

export default PasswordResetInitForm
