'use client'
import { useEffect, useState } from 'react'
import PlusBtn from '../../../../{components}/PlusBtn'
import Avatar from '../../../../{components}/avatar'
import IhiNumber from '../../../../{components}/ihi-number'
import StatusBadge from '../../../../{components}/status-badge'
import { WarningIcon } from '../../../../{components}/warning-icon'
import {
  capitalizeFirstLetterOfAllWords,
  formatDate,
} from '../../../{util}/basic-utils'
import { Organization } from '../../../../{lib}/provider_types'

export function OrganizationLookupList({
  organizations,
  onOrganizationRowClicked,
  option = 'LONG',
}: {
  organizations: Organization[]
  onOrganizationRowClicked: (organization: Organization) => void
  option: string
}) {
  const [showShort, setShowShort] = useState(false)

  useEffect(() => {
    setShowShort(option === 'SHORT')
  }, [organizations, option])

  return (
    <div
      className={
        'overflow-hidden border border-gray-100 bg-white sm:rounded-md'
      }
    >
      <ul role="list" className="divide-y divide-gray-200">
        {organizations &&
          organizations.map((organization: Organization) => (
            <li key={organization.hpio_number + 'x'}>
              {showShort && (
                <RowShort
                  onOrganizationRowClicked={onOrganizationRowClicked}
                  organization={organization}
                />
              )}

              {!showShort && (
                <RowLong
                  onOrganizationRowClicked={onOrganizationRowClicked}
                  organization={organization}
                />
              )}
            </li>
          ))}
      </ul>
    </div>
  )
}

function RowShort({
  onOrganizationRowClicked,
  organization,
}: {
  onOrganizationRowClicked: (patient: Organization) => void
  organization: Organization
}) {
  return (
    <div className="grid grid-cols-10 items-center bg-gray-50 p-3">
      <div className="col-span-9">
        <div className="mt-2 flex items-center text-sm text-gray-500">
          HPIO #{' '}
          <span className="ml-2 font-semibold text-gray-800">
            <IhiNumber ihi_number={organization.hpio_number || ''} />
          </span>
        </div>

        <p className="flex items-center text-sm text-gray-500">
          Name{' '}
          <span className="ml-2 font-semibold text-gray-800">
            {organization.name}
          </span>
        </p>
      </div>
      <div>
        <PlusBtn
          onClickHandler={() => onOrganizationRowClicked(organization)}
        />
      </div>
    </div>
  )
}

function RowLong({
  onOrganizationRowClicked: onOrganizationRowClicked,
  organization,
}: {
  onOrganizationRowClicked: (patient: Organization) => void
  organization: Organization
}) {
  const [patientBasedStyle, setPatientBasedStyle] = useState(
    'border-white-100 bg-white'
  )

  useEffect(() => {
    if (!organization.hpio_number)
      setPatientBasedStyle('border border-amber-200 ')
  }, [organization.hpio_number])

  return (
    <div className={`${patientBasedStyle}  px-4 py-4 sm:px-6`}>
      <div>
        {!organization.hpio_number && (
          <div className="flex items-center pb-5">
            <WarningIcon size="8" />
            <div className="ml-3 text-sm text-amber-600">
              Organization not found in Health Services, but you can add
              Organization to the system.
              <div>
                Note, you wont be able to use e-prescription serivce for this
                Organization until successfully validated via Health Services.
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={` flex items-center `}>
        <div className="flex min-w-0 flex-1 items-center">
          <div className="min-w-0 flex-1  md:grid md:grid-cols-3 md:gap-4">
            <div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                HPIO #{' '}
                <div className="flex items-center">
                  <span className="ml-2 font-semibold text-gray-800">
                    <IhiNumber ihi_number={organization.hpio_number || ''} />
                  </span>
                  <StatusBadge status={organization?.hpio_status} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <PlusBtn
            onClickHandler={() => onOrganizationRowClicked(organization)}
          />
        </div>
      </div>
    </div>
  )
}
