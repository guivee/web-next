import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { CheckIcon } from '@heroicons/react/24/solid'

// @ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export type dropdownItemType = {
  id: number
  value: string
  display: string
}
export function DropdownComponent({
  dropdownItems,
  name,
}: {
  dropdownItems: dropdownItemType[]
  name: string
}) {
  return (
    <select
      id={`${name}-dropdown`}
      name={name}
      className=" block w-full rounded-md border-gray-300 py-2 pl-3 pr-10  text-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
      defaultValue="Canada"
    >
      {dropdownItems.map((item) => (
        <option key={item.id}>{item.display}</option>
      ))}
    </select>
  )
}

export default DropdownComponent
