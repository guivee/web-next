'use client'
import { Fragment, use, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Action } from '../{lib}/types'
import { Patient } from '../dashboard/{util}/patient_types'
import { PatientLookupList } from '../dashboard/patients/{components}/patient-lookup-list'
import { useRouter } from 'next/navigation'
import { BUILD_PATIENT_PROFILE_LINK } from '../{lib}/links'

type ActionDialogComponentProps = {
  action: Action
  conflicts: any[]
  showConfirm?: boolean
  confirmHandler?: (action: Action) => void
}
export default function ActionDialogComponent({
  action,
  conflicts,
  showConfirm,
  confirmHandler: submitHandler,
}: ActionDialogComponentProps) {
  const [open, setOpen] = useState(false)

  const router = useRouter()
  const onPatientRowClicked = (patient: Patient) => {
    router.push(BUILD_PATIENT_PROFILE_LINK(patient?.patient_id || ''))
  }

  useEffect(() => {
    setOpen(action?.notify?.value || false)
  }, [action])

  const handleClick = () => {
    setOpen(false)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div className="pb-3">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                    <ExclamationTriangleIcon
                      className="h-6 w-6 text-yellow-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-600"
                    >
                      {`${action?.notify?.message}`}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500"></p>
                    </div>
                  </div>
                </div>
                <PatientLookupList
                  patients={conflicts}
                  onPatientRowClicked={onPatientRowClicked}
                  option={'SHORT'}
                />
                <div className="mt-5 flex space-x-2 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-secondary-300 bg-secondary-100 px-3 py-2 text-sm font-semibold text-secondary-500 shadow-sm hover:bg-secondary-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-600"
                    onClick={handleClick}
                  >
                    GO BACK
                  </button>
                  {showConfirm && (
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                      onClick={handleClick}
                    >
                      Confirm
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
