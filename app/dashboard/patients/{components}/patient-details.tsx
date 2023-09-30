'use client'
import { Fragment } from 'react'
import { CalendarIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

import {
  Bars3Icon,
  BellIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline'
import Avatar from '../../../{components}/avatar'
import Link from 'next/link'
import {
  BUILD_PATIENT_PROFILE_EDIT_LINK,
  BUILD_PATIENT_PROFILE_LINK,
  BUILD_PRESCRIPTION_LINK,
  PATIENTS_LINK,
} from '../../../{lib}/links'
import StackedLabel from '../../../{components}/stacked-label'
import { Patient } from '../../{util}/patient_types'
import {
  formatDate,
  formatDatePretty,
  formatIhiNumber,
  getFullName,
} from '../../{util}/basic-utils'
import StatusBadge from '../../../{components}/status-badge'
import { useRouter } from 'next/navigation'

export default function PateintDetailsComponent({
  patient,
}: {
  patient: Patient
}) {
  const router = useRouter()
  const editPatientHandler = (patient_id: string | undefined) => {
    if (!patient_id) return
    router.push(BUILD_PATIENT_PROFILE_EDIT_LINK(patient_id || ''))
  }

  // const CREATE_PRESCRIPTION_LINK = `${PATIENTS_LINK}/${patient_id}/prescriptions`
  return (
    <>
      <div className="min-h-full">
        <main className="py-3 sm:py-1">
          {/* Page header */}
          <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:items-center lg:px-8">
            <div className="flex items-center space-x-5">
              <div className="flex-shrink-0">
                <Avatar
                  full_name={getFullName(
                    patient.family_name,
                    patient.given_name || ''
                  )}
                />
              </div>
              <div>
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {getFullName(patient.family_name, patient.given_name || '')}
                  </h1>
                  <StatusBadge status={patient?.ihi_record_status} />
                </div>

                <div
                  className="w-24 cursor-pointer rounded-md border border-gray-200 bg-gray-200 py-1 text-center text-xs text-gray-500 hover:bg-gray-100"
                  onClick={() => editPatientHandler(patient?.patient_id)}
                >
                  Edit Patient
                </div>
              </div>
            </div>
            <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
              <div className="flex cursor-pointer items-center  justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                <PencilSquareIcon className="mr-2 h-6 w-6" />
                <Link href={BUILD_PRESCRIPTION_LINK(patient.patient_id || '')}>
                  <div>New prescription</div>
                </Link>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1  sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-3 lg:col-start-1">
              {/* Description list*/}
              <section aria-labelledby="applicant-information-title">
                <div className="border bg-white sm:rounded-lg">
                  <div className=" px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1  gap-x-4 gap-y-8 md:grid-cols-9 lg:grid-cols-10">
                      <div className="sm:col-span-5 md:col-span-3 lg:col-span-2">
                        <StackedLabel
                          label={'IHI #'}
                          value={formatIhiNumber(patient.ihi_number || '')}
                          badge={patient.ihi_status}
                        />
                      </div>
                      <div className="sm:col-span-5 md:col-span-3 lg:col-span-2">
                        <StackedLabel
                          label={'Medicare card #'}
                          value={patient.medicare_card_number}
                        />
                      </div>
                      <div className="sm:col-span-5  md:col-span-3 lg:col-span-2">
                        <StackedLabel
                          label={'DVA #'}
                          value={patient.dva_file_number}
                        />
                      </div>
                      <div className="sm:col-span-5 md:col-span-3 lg:col-span-2">
                        <StackedLabel
                          label={'DOB'}
                          value={formatDate(patient.date_of_birth, true)}
                        />
                        <dt className="text-sm font-medium text-gray-500"></dt>
                        <dd className="mt-1 text-sm text-gray-900"></dd>
                      </div>
                      <div className="sm:col-span-5 md:col-span-3 lg:col-span-2">
                        <StackedLabel label={'Gender'} value={patient.sex} />
                      </div>

                      <div className="sm:col-span-5 md:col-span-3 lg:col-span-2">
                        <StackedLabel label={'Phone'} value={patient.phone} />
                      </div>
                      <div className="sm:col-span-5 md:col-span-3 lg:col-span-2">
                        <StackedLabel label={'Email'} value={patient.email} />
                      </div>
                      <div className="sm:col-span-5 md:col-span-3 lg:col-span-2">
                        <StackedLabel
                          label={'Indegenous Type'}
                          value={undefined}
                        />
                      </div>
                      <div className="sm:col-span-4">
                        <StackedLabel label={'Address'} value={undefined} />
                      </div>
                    </dl>
                  </div>
                </div>
              </section>

              <section>
                <PrescriptionList />
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

const prescriptions = [
  {
    id: 1,
    name: 'Zopiclone',
    dose: '7.5mg (1 Tablet)',
    frequency: 'Night',
    route: 'Oral',
    formulation: 'Tablets',
    quantity: '30',
    date: '12/02/2019',
    indication: 'Anxiety',
  },
  {
    id: 2,
    name: 'Zopiclone',
    dose: '7.5mg (1 Tablet)',
    frequency: 'Night',
    route: 'Oral',
    formulation: 'Tablets',
    quantity: '30',
    date: '12/23/2019',
    indication: 'Insomnia',
  },
  {
    id: 3,
    name: 'Diazepam',
    dose: '5mg (1 Tablet)',
    frequency: 'Morning',
    route: 'Oral',
    formulation: 'Tablets',
    quantity: '50',
    date: '02/05/2019',
    indication: 'Insomnia',
  },
]

export function PrescriptionList() {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {prescriptions.map((prescription) => (
          <li key={prescription.id}>
            <div className="flex cursor-pointer items-center justify-between py-5 hover:bg-gray-50">
              <div className="flex  w-36  border-r px-2 sm:w-24 ">
                <div className="flex h-full items-center justify-center text-center font-medium text-gray-600">
                  {formatDatePretty(prescription.date)}
                </div>
              </div>
              <div className="flex w-full items-center justify-between px-4  sm:px-6">
                <div className="min-w-0">
                  <div className="truncate">
                    <div className="text-md flex">
                      <p className="te truncate font-medium text-secondary-600">
                        {prescription.name}
                      </p>
                      {/* <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                        {prescription.dose}
                      </p> */}
                    </div>
                    <div className="mt-2 flex">
                      <div className="flex items-center text-sm text-gray-500">
                        <div className=" grid  grid-cols-6 items-center gap-4 text-xs lg:w-[40rem]">
                          <div className="col-span-3 flex-col lg:col-span-1 ">
                            <div className="mr-2 font-semibold text-gray-600">
                              Dose:{' '}
                            </div>
                            <div className="mr-3">{prescription.dose}</div>
                          </div>

                          <div className="col-span-3 flex-col lg:col-span-1">
                            <div className="mr-2 font-semibold text-gray-600">
                              Frequency:{' '}
                            </div>
                            <div className="mr-3">{prescription.frequency}</div>
                          </div>

                          <div className="col-span-3 flex-col lg:col-span-1">
                            <div className="mr-2 font-semibold text-gray-600">
                              Route:{' '}
                            </div>
                            <div className="mr-3">{prescription.route}</div>
                          </div>

                          <div className="col-span-3 flex-col lg:col-span-1">
                            <div className="mr-2 font-semibold text-gray-600">
                              Formulation:{' '}
                            </div>
                            <div className="mr-3">
                              {prescription.formulation}
                            </div>
                          </div>

                          <div className="col-span-3 flex-col lg:col-span-1">
                            <div className="mr-2 font-semibold text-gray-600">
                              Quantity:{' '}
                            </div>
                            <div className="mr-3">{prescription.quantity}</div>
                          </div>

                          <div className="col-span-3 flex-col lg:col-span-1">
                            <div className="mr-2 font-semibold text-gray-600">
                              Indication{' '}
                            </div>
                            <div className="mr-3">
                              {prescription.indication}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex">
                {/* <div className="mr-2 rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-800">
                  {prescription.indication}
                </div> */}
                <div className="mx-3 flex-shrink-0">
                  <ChevronRightIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
