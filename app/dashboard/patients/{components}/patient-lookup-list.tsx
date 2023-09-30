'use client'
import { useEffect, useState } from 'react'
import PlusBtn from '../../../{components}/PlusBtn'
import Avatar from '../../../{components}/avatar'
import IhiNumber from '../../../{components}/ihi-number'
import {
  capitalizeFirstLetterOfAllWords,
  formatDate,
} from '../../{util}/basic-utils'
import { Patient } from '../../{util}/patient_types'
import StatusBadge from '../../../{components}/status-badge'
import { WarningIcon } from '../../../{components}/warning-icon'

export function PatientLookupList({
  patients,
  onPatientRowClicked,
  option = 'LONG',
}: {
  patients: Patient[]
  onPatientRowClicked: (patient: Patient) => void
  option: string
}) {
  const [showShort, setShowShort] = useState(false)

  useEffect(() => {
    setShowShort(option === 'SHORT')
  }, [patients, option])

  return (
    <div
      className={
        'overflow-hidden border border-gray-100 bg-white sm:rounded-md'
      }
    >
      <ul role="list" className="divide-y divide-gray-200">
        {patients &&
          patients.map((patient: Patient) => (
            <li key={patient.ihi_number + 'x'}>
              {showShort && (
                <RowShort
                  onPatientRowClicked={onPatientRowClicked}
                  patient={patient}
                />
              )}

              {!showShort && (
                <RowLong
                  onPatientRowClicked={onPatientRowClicked}
                  patient={patient}
                />
              )}
            </li>
          ))}
      </ul>
    </div>
  )
}

function RowShort({
  onPatientRowClicked,
  patient,
}: {
  onPatientRowClicked: (patient: Patient) => void
  patient: Patient
}) {
  return (
    <div className="grid grid-cols-10 items-center bg-gray-50 p-3">
      <div className="col-span-9">
        <p className="text-grey-600 truncate text-sm font-medium">
          {capitalizeFirstLetterOfAllWords(
            `${patient.given_name} ${patient.family_name}`
          )}
        </p>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          IHI #{' '}
          <span className="ml-2 font-semibold text-gray-800">
            <IhiNumber ihi_number={patient.ihi_number || ''} />
          </span>
        </div>
        <p className="flex items-center text-sm text-gray-500">
          DOB{' '}
          <time
            className="ml-2 font-semibold text-gray-800"
            dateTime={patient.date_of_birth}
          >
            {formatDate(patient.date_of_birth, true)}
          </time>
        </p>
        <p className="flex items-center text-sm text-gray-500">
          Gender{' '}
          <span className="ml-2 font-semibold text-gray-800">
            {patient.sex}
          </span>
        </p>
      </div>
      <div>
        <PlusBtn onClickHandler={() => onPatientRowClicked(patient)} />
      </div>
    </div>
  )
}

function RowLong({
  onPatientRowClicked,
  patient,
}: {
  onPatientRowClicked: (patient: Patient) => void
  patient: Patient
}) {
  const [patientBasedStyle, setPatientBasedStyle] = useState(
    'border-white-100 bg-white'
  )

  useEffect(() => {
    if (!patient.ihi_number) setPatientBasedStyle('border border-amber-200 ')
  }, [patient.ihi_number])

  return (
    <div className={`${patientBasedStyle}  px-4 py-4 sm:px-6`}>
      <div>
        {!patient.ihi_number && (
          <div className="flex items-center pb-5">
            <WarningIcon size="8" />
            <div className="ml-3 text-sm text-amber-600">
              Patient not found in Health Services, but you can add Patient to
              the system.
              <div>
                Note, you wont be able to use e-prescription serivce for this
                Patient until successfully validated via Health Services.
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={` flex items-center `}>
        <div className="flex min-w-0 flex-1 items-center">
          <div className="flex-shrink-0">
            <Avatar
              full_name={`${patient.given_name} ${patient.family_name}`}
            />
          </div>
          <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-3 md:gap-4">
            <div>
              <div className="flex items-center">
                <p className="text-grey-600 truncate text-sm font-medium">
                  {capitalizeFirstLetterOfAllWords(
                    `${patient.given_name} ${patient.family_name}`
                  )}
                </p>
                <StatusBadge status={patient?.ihi_record_status} />
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                IHI #{' '}
                <div className="flex items-center">
                  <span className="ml-2 font-semibold text-gray-800">
                    <IhiNumber ihi_number={patient.ihi_number || ''} />
                  </span>
                  <StatusBadge status={patient?.ihi_status} />
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div>
                <p className="flex items-center text-sm text-gray-500">
                  DOB{' '}
                  <time
                    className="ml-2 font-semibold text-gray-800"
                    dateTime={patient.date_of_birth}
                  >
                    {formatDate(patient.date_of_birth, true)}
                  </time>
                </p>
                <p className="mt-2 flex items-center text-sm text-gray-500">
                  Medicare Card #{' '}
                  <span className="ml-2 font-semibold text-gray-800">
                    {patient.medicare_card_number}
                  </span>
                </p>
              </div>
            </div>
            <div className="hidden md:block">
              <div>
                <p className="flex items-center text-sm text-gray-500">
                  Gender{' '}
                  <span className="ml-2 font-semibold text-gray-800">
                    {patient.sex}
                  </span>
                </p>
                <p className="mt-2 flex items-center text-sm text-gray-500">
                  DVA file #{' '}
                  <span className="ml-2 font-semibold text-gray-800">
                    {patient.dva_file_number}
                  </span>
                </p>
                {/* <p className="mt-2 flex items-center text-sm text-gray-500">
              <CheckCircleIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
              aria-hidden="true"
              />
              {patient.ihi_status}
              </p> */}
              </div>
            </div>
          </div>
        </div>
        <div>
          <PlusBtn onClickHandler={() => onPatientRowClicked(patient)} />
        </div>
      </div>
    </div>
  )
}
