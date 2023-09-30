// 'use client'

import { RoleEnum, Tab, User } from '../../../{lib}/acl_types'

import {
  ACCOUNT_LINK,
  BILLING_LINK,
  ORGANIZATION_LINK,
  USERS_LINK,
} from '../../../{lib}/links'

import { SettingsTab } from './settings-shell-tab'

//@ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

interface SettingsShellProps {
  children: any
  user: User
}

export default async function SettingsShell({
  children,
  user,
}: SettingsShellProps) {
  const commonStyle = 'p-1 mt-2 sm:mt-10'

  const TABS_LIST: Tab[] = [
    {
      key: 'account',
      name: 'Account',
      href: ACCOUNT_LINK,
      current: false,
      permissionRoles: [],
    },
    {
      key: 'users',
      name: 'Users',
      href: USERS_LINK,
      current: false,
      permissionRoles: [RoleEnum.ADMIN, RoleEnum.OWNER],
    },
    {
      key: 'organization',
      name: 'Organization',
      href: ORGANIZATION_LINK,
      permissionRoles: [RoleEnum.OWNER],
    },
    {
      key: 'billing',
      name: 'Billing',
      href: BILLING_LINK,
      permissionRoles: [RoleEnum.OWNER],
    },
  ]

  const tabs = TABS_LIST.filter(
    (tab) =>
      tab.permissionRoles.length === 0 ||
      tab.permissionRoles.some((role) => user.access_roles.includes(role))
  )

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500"
          //@ts-ignore
          // defaultValue={tabs.find((tab) => tab.current).name}
        >
          {tabs.map((tab) => {
            return <option key={tab.key}>{tab.name}</option>
          })}
        </select>

        {/* Content */}
        <div className={commonStyle}>{children}</div>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab: Tab) => {
              return <SettingsTab key={tab.key} tab={tab} />
            })}
          </nav>
        </div>

        {/* Content */}
        <div className={commonStyle}>{children}</div>
      </div>
    </div>
  )
  // }
}
