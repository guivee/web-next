'use client'
import { useEffect, useState } from 'react'
import { Provider } from '../../../../{lib}/provider_types'
import PlusBtn from '../../../../{components}/PlusBtn'
import Avatar from '../../../../{components}/avatar'
import IhiNumber from '../../../../{components}/ihi-number'
import StatusBadge from '../../../../{components}/status-badge'
import { WarningIcon } from '../../../../{components}/warning-icon'
import {
  capitalizeFirstLetterOfAllWords,
  formatDate,
} from '../../../{util}/basic-utils'

export function ProviderLookupList({
  providers,
  onProviderRowClicked,
  option = 'LONG',
}: {
  providers: Provider[]
  onProviderRowClicked: (provider: Provider) => void
  option: string
}) {
  const [showShort, setShowShort] = useState(false)

  useEffect(() => {
    setShowShort(option === 'SHORT')
  }, [providers, option])

  return (
    <div
      className={
        'overflow-hidden border border-gray-100 bg-white sm:rounded-md'
      }
    >
      <ul role="list" className="divide-y divide-gray-200">
        {providers &&
          providers.map((provider: Provider) => (
            <li key={provider.hpii_number + 'x'}>
              {showShort && (
                <RowShort
                  onProviderRowClicked={onProviderRowClicked}
                  provider={provider}
                />
              )}

              {!showShort && (
                <RowLong
                  onProviderRowClicked={onProviderRowClicked}
                  provider={provider}
                />
              )}
            </li>
          ))}
      </ul>
    </div>
  )
}

function RowShort({
  onProviderRowClicked,
  provider,
}: {
  onProviderRowClicked: (patient: Provider) => void
  provider: Provider
}) {
  return (
    <div className="grid grid-cols-10 items-center bg-gray-50 p-3">
      <div className="col-span-9">
        <p className="text-grey-600 truncate text-sm font-medium">
          {capitalizeFirstLetterOfAllWords(
            `${provider.given_name} ${provider.family_name}`
          )}
        </p>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          IHI #{' '}
          <span className="ml-2 font-semibold text-gray-800">
            <IhiNumber ihi_number={provider.hpii_number || ''} />
          </span>
        </div>
        <p className="flex items-center text-sm text-gray-500">
          DOB{' '}
          <time
            className="ml-2 font-semibold text-gray-800"
            dateTime={provider.date_of_birth}
          >
            {formatDate(provider.date_of_birth, true)}
          </time>
        </p>
        <p className="flex items-center text-sm text-gray-500">
          Gender{' '}
          <span className="ml-2 font-semibold text-gray-800">
            {provider.sex}
          </span>
        </p>
      </div>
      <div>
        <PlusBtn onClickHandler={() => onProviderRowClicked(provider)} />
      </div>
    </div>
  )
}

function RowLong({
  onProviderRowClicked: onProviderRowClicked,
  provider,
}: {
  onProviderRowClicked: (patient: Provider) => void
  provider: Provider
}) {
  const [patientBasedStyle, setPatientBasedStyle] = useState(
    'border-white-100 bg-white'
  )

  useEffect(() => {
    if (!provider.hpii_number) setPatientBasedStyle('border border-amber-200 ')
  }, [provider.hpii_number])

  return (
    <div className={`${patientBasedStyle}  px-4 py-4 sm:px-6`}>
      <div>
        {!provider.hpii_number && (
          <div className="flex items-center pb-5">
            <WarningIcon size="8" />
            <div className="ml-3 text-sm text-amber-600">
              Provider not found in Health Services, but you can add Provider to
              the system.
              <div>
                Note, you wont be able to use e-prescription serivce for this
                Provider until successfully validated via Health Services.
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={` flex items-center `}>
        <div className="flex min-w-0 flex-1 items-center">
          <div className="flex-shrink-0">
            <Avatar
              full_name={`${provider.given_name} ${provider.family_name}`}
            />
          </div>
          <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-3 md:gap-4">
            <div>
              <div className="flex items-center">
                <p className="text-grey-600 truncate text-sm font-medium">
                  {capitalizeFirstLetterOfAllWords(
                    `${provider.given_name} ${provider.family_name}`
                  )}
                </p>
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                IHI #{' '}
                <div className="flex items-center">
                  <span className="ml-2 font-semibold text-gray-800">
                    <IhiNumber ihi_number={provider.hpii_number || ''} />
                  </span>
                  <StatusBadge status={provider?.hpii_status} />
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div>
                <p className="flex items-center text-sm text-gray-500">
                  DOB{' '}
                  <time
                    className="ml-2 font-semibold text-gray-800"
                    dateTime={provider.date_of_birth}
                  >
                    {formatDate(provider.date_of_birth, true)}
                  </time>
                </p>
              </div>
            </div>
            <div className="hidden md:block">
              <div>
                <p className="flex items-center text-sm text-gray-500">
                  Gender{' '}
                  <span className="ml-2 font-semibold text-gray-800">
                    {provider.sex}
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
          <PlusBtn onClickHandler={() => onProviderRowClicked(provider)} />
        </div>
      </div>
    </div>
  )
}
