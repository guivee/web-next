'use client'
import algoliasearch from 'algoliasearch/lite'
import 'instantsearch.css/themes/satellite-min.css'
import { useConnector } from 'react-instantsearch-hooks-web'
import connectAutocomplete from 'instantsearch.js/es/connectors/autocomplete/connectAutocomplete'

import { InstantSearch } from 'react-instantsearch-hooks-web'
import { IMedicationType, MEDICATION_TYPE } from '../{lib}/types'

import { useEffect, useState } from 'react'
import { CheckIcon } from '@heroicons/react/20/solid'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

import { Combobox } from '@headlessui/react'

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_APIKEY || ''
)

function Hit({ hit, setSelectedHitType }: any) {
  const genericMedHandler = (hit: any) => {
    // console.log('genericMedHandler', hit)
    setSelectedHitType(MEDICATION_TYPE.GENERIC)
  }

  const brandedMedHandler = (hit: any) => {
    // console.log('brandedMedHandler', hit)
    setSelectedHitType(MEDICATION_TYPE.BRANDED)
  }

  // iterate hits and render them
  return (
    <>
      <div className="py-3 " key={`${hit.pk}`}>
        <div
          className="cursor-pointer rounded-md border border-white px-3 py-2 text-lg font-semibold text-gray-900  hover:text-primary-700 hover:underline"
          onClick={() => genericMedHandler(hit)}
        >
          {hit.mpp_pt}
        </div>

        <div
          className="flex  cursor-pointer rounded-md py-1 pl-6  text-sm font-normal text-gray-800 hover:text-secondary-700 "
          onClick={() => brandedMedHandler(hit)}
        >
          <div className="mr-2 mb-3  h-3 w-3  border-l-2 border-b-2 border-gray-400 "></div>
          <div className="flex items-center">
            <div className="mr-1 rounded-md border border-secondary-300 bg-secondary-50 px-1 text-secondary-600 ">
              {' '}
              brand
            </div>
            <div className="hover:underline"> {hit.tpp_pt}</div>
          </div>
        </div>
      </div>
    </>
  )
}

import type {
  AutocompleteConnectorParams,
  AutocompleteWidgetDescription,
} from 'instantsearch.js/es/connectors/autocomplete/connectAutocomplete'

export type UseAutocompleteProps = AutocompleteConnectorParams

export function useAutocomplete(props?: UseAutocompleteProps) {
  return useConnector<
    AutocompleteConnectorParams,
    AutocompleteWidgetDescription
    // @ts-ignore
  >(connectAutocomplete, props)
}

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ')
}

function AutocompleteComponent(props: any) {
  const [selectedHit, setSelectedHit] = useState(null)
  const [selectedHitType, setSelectedHitType] = useState(null)
  const { onChange } = props

  const { indices, currentRefinement, refine } = useAutocomplete(props)

  console.log('indices', indices)
  console.log('selectedHitType', selectedHitType)

  useEffect(() => {
    onChange(selectedHit, selectedHitType)
  }, [selectedHit, selectedHitType])

  let hits = indices.length > 0 ? indices[0].hits : []

  const handleChange = (event: any) => {
    // console.log('event.target.value', event.target.value)
    refine(event.target.value)
  }

  return (
    <Combobox as="div" value={selectedHit} onChange={setSelectedHit}>
      {/* <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">
        Assigned to
      </Combobox.Label> */}
      <div className="relative">
        <Combobox.Input
          className="br-input"
          onChange={handleChange}
          displayValue={(hit: any) => hit?.mpp_pt}
          placeholder="Search for a medication"
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {currentRefinement.length > 0 && hits.length > 0 && (
          <Combobox.Options className="max-h-60 absolute z-10 mt-1 w-full overflow-auto  overflow-y-auto rounded-lg rounded-t-none border bg-white py-1 text-base shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {hits.map((hit) => (
              <Combobox.Option
                key={hit.pk}
                value={hit}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? '' : ''
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <Hit hit={hit} setSelectedHitType={setSelectedHitType} />

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-indigo-600'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  )
}

type SearchBarMedsProps = {
  onChange: (hit: any, medication_type: IMedicationType) => void
}

export default function SearchBarMeds({ onChange }: any) {
  const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || ''

  return (
    <InstantSearch searchClient={searchClient} indexName={indexName}>
      <AutocompleteComponent onChange={onChange} />
    </InstantSearch>
  )
}
