'use client'

import { useRouter } from 'next/navigation'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { WrenchIcon } from '@heroicons/react/24/outline'
import { SubmitHandler, useForm, useController } from 'react-hook-form'
import { RoleEnum, User } from '../../../../{lib}/acl_types'
import ErrorMsg from '../../../../{components}/error-msg'
import {
  capitalizeFirstLetterOfAllWords,
  convertArrayToString,
  removeUndefinedFromArray,
} from '../../../{util}/basic-utils'
import { getUpdateUserUrl } from '../../../../../src/lib/api_endpoints'
import axios from 'axios'
import { axiosErrorHandler } from '../../../../{lib}/utils'

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

export default function EditUserModal({
  user,
  onDismiss,
  showModal,
  id_token,
}: {
  user: User
  onDismiss: () => void
  showModal: boolean
  id_token: string
}) {
  const focusButtonRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()

  type FormValues = {
    access_roles: {
      [key in RoleEnum]: boolean
    }
  }

  if (!user) {
    return <>Invalid User</>
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

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const new_roles = removeUndefinedFromArray(data.access_roles)

    await updateUserRoleService(
      id_token,
      user.organization_id,
      user.user_id,
      new_roles
    ).then(() => {
      router.refresh()
      onDismiss()
    })
  }

  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={focusButtonRef}
        onClose={onDismiss}
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
                          <WrenchIcon
                            className=" h-6 w-6 text-primary-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className=" ml-4 mt-0 text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-xl font-medium leading-6 text-gray-900"
                          >
                            Edit Permissions
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
                            <label className=" br-label">
                              {capitalizeFirstLetterOfAllWords(user.full_name)}
                            </label>
                          </div>

                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Email
                            </label>
                            <label className=" br-label">
                              {user.email.toLowerCase()}
                            </label>
                          </div>
                          <div className="">
                            <Checkboxes
                              options={options}
                              control={control}
                              name="access_roles"
                              errors={errors}
                              access_roles={user.access_roles}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" justify-between bg-gray-50 px-4 py-3  sm:flex sm:px-4">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2  sm:w-auto sm:text-sm"
                      onClick={() => onDismiss()}
                    >
                      Deactivate
                    </button>

                    <div className="mt-3  space-y-3 sm:mt-0  sm:flex  sm:space-y-0">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:mt-0  sm:w-auto sm:text-sm"
                        onClick={() => onDismiss()}
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className=" inline-flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:ml-3  sm:w-auto sm:text-sm"
                      >
                        {isSubmitting ? 'Updating...' : 'Update'}
                      </button>
                    </div>
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

const Checkboxes = ({
  options,
  control,
  name,
  errors,
  access_roles,
}: {
  options: any
  control: any
  name: any
  errors: any
  access_roles: RoleEnum[]
}) => {
  const defaultValue = access_roles
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    defaultValue,
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
                    <label className="rounded-md border border-secondary-200 bg-secondary-50 px-1 py-0 text-secondary-800">
                      billable
                    </label>
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

export const updateUserRoleService = async (
  idToken: any,
  organization_id: string,
  user_id: string,
  new_roles: RoleEnum[]
) => {
  const endpoint = getUpdateUserUrl(organization_id, user_id)
  let result

  const headers = { Authorization: `${idToken}` }

  const body = {
    access_roles: new_roles,
  }

  // write axios put request with authorization header
  await axios
    .patch(endpoint, body, {
      headers,
    })
    .then(({ data }) => {
      result = data
    })
    .catch((error) => {
      axiosErrorHandler('updateUserRole', error)
    })

  return result
}
