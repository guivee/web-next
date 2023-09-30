'use client'

import { useRouter } from 'next/navigation'
import { Fragment, useContext, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { UserIcon } from '@heroicons/react/24/outline'
import { SubmitHandler, useForm, useController } from 'react-hook-form'
import { RoleEnum } from '../../../../{lib}/acl_types'
import { ErrorMessage } from '@hookform/error-message'
import ErrorMsg from '../../../../{components}/error-msg'

import {
  Action,
  AmplifyUserContext,
} from '../../../../auth/{components}/useAmplifyUser'
import {
  convertArrayToString,
  removeUndefinedFromArray,
} from '../../../{util}/basic-utils'

const options = [
  {
    value: 'admin',
    label: 'Admin',
    description: 'This role allows the user to perform administative tasks.',
    billable: false,
  },
  {
    value: 'doctor',
    label: 'Doctor',
    description:
      'This role allows the user to create prescriptions and manage patient health data.',
    billable: true,
  },
  {
    value: 'receptionist',
    label: 'Receptionist',
    description:
      'This role allows the user to manage patient personal data and read prescription data.',
    billable: false,
  },
]

export default function InviteUserModal({
  toggle,
  setToggle,
  organization_id,
}: {
  toggle: boolean
  setToggle: (toggle: boolean) => void
  organization_id: string
}) {
  const focusButtonRef = useRef<HTMLInputElement | null>(null)
  const { signUp } = useContext(AmplifyUserContext)
  const router = useRouter()
  type FormValues = {
    full_name: string
    email: string
    access_roles: {
      [key in RoleEnum]: boolean
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
    setError,
    clearErrors,
    control,
  } = useForm<FormValues>()

  const { ref, ...rest } = register('full_name', {
    required: 'Required',
    maxLength: { value: 150, message: 'Length too long' },
    minLength: { value: 1, message: 'Please enter name' },
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const signupData = {
      full_name: data.full_name,
      email: data.email,
      password: generatePassword(),
      access_roles: convertArrayToString(
        removeUndefinedFromArray(data.access_roles)
      ),
      organization_id,
    }

    await signUp(signupData, true)
      .then(() => {
        setToggle(false)
        router.refresh()

        reset()
      })
      .catch((err) => {
        setError('email', {
          type: 'custom',
          message: err.message,
        })
      })
  }

  return (
    <Transition.Root show={toggle} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={focusButtonRef}
        onClose={setToggle}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 ">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="flex-row space-y-3">
                      <div className="flex">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 sm:mx-0 sm:h-10 sm:w-10">
                          <UserIcon
                            className=" h-6 w-6 text-primary-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className=" ml-4 mt-0 text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-xl font-medium leading-6 text-gray-900"
                          >
                            Add user account
                          </Dialog.Title>
                          <div className="mt-0">
                            <p className="text-sm text-gray-500">
                              Use this form to invite a user to Parchment.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="space-y-5">
                          <div>
                            <label
                              htmlFor="full_name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Name
                            </label>
                            <input
                              {...rest}
                              name="full_name"
                              ref={(e) => {
                                ref(e)
                                focusButtonRef.current = e // you can still assign to ref
                              }}
                              className="br-input"
                            />
                            <ErrorMessage
                              errors={errors}
                              name="full_name"
                              render={({ message }) => (
                                <ErrorMsg message={message} />
                              )}
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Email
                            </label>
                            <input
                              {...register('email', {
                                required: 'Required',
                                maxLength: {
                                  value: 50,
                                  message: 'Length too long',
                                },
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
                              render={({ message }) => (
                                <ErrorMsg message={message} />
                              )}
                            />
                          </div>
                          <div className="">
                            <Checkboxes
                              options={options}
                              control={control}
                              name="access_roles"
                              errors={errors}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      {isSubmitting ? 'Inviting...' : 'Invite'}
                    </button>

                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setToggle(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

// Generate strong pasword with atleast one number, one special character and one uppercase letter
function generatePassword() {
  const lowerCase = 'abcdefghijklmnpqrstuvwxyz'
  const upperCase = 'ABCDEFGHIJKLMNPQRSTUVWXYZ'
  const numbers = '123456789'
  const specialChars = '!@#%^&*()_+-=[]{}|;\':"<>,.?/\\'

  let characters = lowerCase + upperCase + numbers + specialChars
  let password = ''

  for (let i = 0; i < 15; i++) {
    let randomIndex = Math.floor(Math.random() * characters.length)
    password += characters[randomIndex]
  }

  let randomUpperIndex = Math.floor(Math.random() * upperCase.length)
  password =
    password.slice(0, randomUpperIndex) +
    upperCase[randomUpperIndex] +
    password.slice(randomUpperIndex + 1)

  let randomNumberIndex = Math.floor(Math.random() * numbers.length)
  password =
    password.slice(0, randomNumberIndex) +
    numbers[randomNumberIndex] +
    password.slice(randomNumberIndex + 1)

  let randomSpecialIndex = Math.floor(Math.random() * specialChars.length)
  password =
    password.slice(0, randomSpecialIndex) +
    specialChars[randomSpecialIndex] +
    password.slice(randomSpecialIndex + 1)

  return password
}

const Checkboxes = ({
  options,
  control,
  name,
  errors,
}: {
  options: any
  control: any
  name: any
  errors: any
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    rules: { required: 'Please select a role ' },
  })
  const [value, setValue] = useState(field.value || [])

  return (
    <>
      <fieldset className="rounded-lg  border-gray-200 bg-gray-50 p-5">
        <legend className="sr-only">Notifications</legend>
        <div className="divide-y divide-gray-200">
          {options.map((option: any, index: any) => (
            <div key={option.label} className="relative flex items-start py-4">
              <div className="min-w-0 flex-1 text-sm">
                <div className="flex items-center space-x-2">
                  <label
                    htmlFor={option.label}
                    className="font-medium text-gray-900"
                  >
                    {option.label}
                  </label>
                  {option.billable && (
                    <label className="br-badge">billable</label>
                  )}
                </div>
                <p
                  id={`${option.label}-description`}
                  className="text-xs text-gray-700"
                >
                  {option.description}
                </p>
              </div>
              <div className="ml-3 flex h-5 items-center">
                <input
                  onChange={(e) => {
                    let valueCopy = [...value]

                    // check if value exist in array
                    if (valueCopy.includes(e.target.value)) {
                      // If exists, remove value from array
                      valueCopy = valueCopy.filter(
                        (item: any) => item !== e.target.value
                      )
                    } else {
                      // add value to array
                      valueCopy.push(e.target.value)
                    }

                    // send data to react hook form
                    field.onChange(valueCopy)

                    // update local state
                    setValue(valueCopy)
                  }}
                  key={option.label}
                  checked={value.includes(option.value)}
                  type="checkbox"
                  value={option.value}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
            </div>
          ))}
        </div>
        {error && <ErrorMsg message={error.message} />}
      </fieldset>
    </>
  )
}
