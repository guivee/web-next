'use client'
import Link from 'next/link'
import {
  BUILD_PATIENT_PROFILE_LINK,
  PATIENT_LOOKUP_LINK,
} from '../../../{lib}/links'
import { Patient } from '../../{util}/patient_types'
import {
  capitalizeFirstLetterOfAllWords,
  formatDate,
  getFullName,
} from '../../{util}/basic-utils'
import { useRouter } from 'next/navigation'

// @ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function PatientList({ patients }: { patients: Patient[] }) {
  const router = useRouter()
  const onPatientRowClicked = (patient_id: string) => {
    router.push(BUILD_PATIENT_PROFILE_LINK(patient_id))
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Patients</h1>
          <p className="mt-2 text-sm text-gray-700">
            Here is a list of patients in your system.{' '}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link href={PATIENT_LOOKUP_LINK}>
            <div className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto">
              {' '}
              Lookup new Patient
            </div>
          </Link>
        </div>
      </div>
      <div className="-mx-4 mt-10 overflow-hidden ring-1 ring-gray-300 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Name
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Sex
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                DOB
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Phone
              </th>
            </tr>
          </thead>
          <tbody>
            {patients &&
              patients.map((patient: Patient, patientIdx) => (
                <tr
                  key={patient.patient_id}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => onPatientRowClicked(patient.patient_id || '')}
                >
                  <td
                    className={classNames(
                      patientIdx === 0 ? '' : 'border-t border-transparent',
                      'relative py-4 pl-4 pr-3 text-sm sm:pl-6'
                    )}
                  >
                    <div className="font-medium text-gray-900">
                      {getFullName(
                        patient.family_name,
                        patient.given_name || ''
                      )}
                    </div>
                    {patientIdx !== 0 ? (
                      <div className="absolute right-0 left-6 -top-px h-px bg-gray-200" />
                    ) : null}
                  </td>
                  <td
                    className={classNames(
                      patientIdx === 0 ? '' : 'border-t border-gray-200',
                      'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                    )}
                  >
                    {patient.sex}
                  </td>
                  <td
                    className={classNames(
                      patientIdx === 0 ? '' : 'border-t border-gray-200',
                      'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                    )}
                  >
                    {formatDate(patient.date_of_birth)}
                  </td>
                  <td
                    className={classNames(
                      patientIdx === 0 ? '' : 'border-t border-gray-200',
                      'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                    )}
                  >
                    {patient.phone}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Pagination />
      </div>
    </div>
  )
}

export function Pagination() {
  return (
    <nav
      className="flex w-full items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        {/* <p className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to{' '}
          <span className="font-medium">10</span> of{' '}
          <span className="font-medium">20</span> results
        </p> */}
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
    </nav>
  )
}
