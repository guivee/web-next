'use client'
import { usePathname } from 'next/navigation'
import {
  BuildingOfficeIcon,
  CreditCardIcon,
  UserIcon,
  UsersIcon,
} from '@heroicons/react/20/solid'
import { Tab, TabKey } from '../../../{lib}/acl_types'
//@ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const IconMap: Record<TabKey, any> = {
  account: UserIcon,
  users: UsersIcon,
  organization: BuildingOfficeIcon,
  billing: CreditCardIcon,
}

export const SettingsTab = ({ tab }: { tab: Tab }) => {
  const pathname = usePathname()

  // get last part of pathname
  let lastPathname = pathname ? pathname.split('/').pop() : null
  const Icon = IconMap[tab.key]
  return (
    <a
      key={tab.name}
      href={tab.href}
      className={classNames(
        tab.key === lastPathname
          ? 'border-primary-500 text-primary-600'
          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
        'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium'
      )}
      aria-current={tab.current ? 'page' : undefined}
    >
      <Icon
        className={classNames(
          tab.current
            ? 'text-primary-500'
            : 'text-gray-400 group-hover:text-gray-500',
          '-ml-0.5 mr-2 h-5 w-5'
        )}
        aria-hidden="true"
      />
      <div>{tab.name}</div>
    </a>
  )
}
