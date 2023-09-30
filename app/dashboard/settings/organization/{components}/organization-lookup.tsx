'use client'

import { useState } from 'react'

import { User } from '../../../../{lib}/acl_types'
import { Organization } from '../../../../{lib}/provider_types'
import SearchOrganizationComponent from './search-organization-component'
import OrganizationList from './organization-list'

interface OrganizationLookupProps {
  id_token: string
  user: User
}

const OrganizationLookup = ({ id_token, user }: OrganizationLookupProps) => {
  const [organizations, setOrganizations] = useState<Organization[]>([])

  return (
    <div className="mt-10 mb-5 grid grid-cols-2 gap-5 p-2 sm:mt-0">
      <div className="col-span-2 lg:col-span-2">
        <SearchOrganizationComponent
          id_token={id_token}
          setOrganizations={setOrganizations}
          user={user}
        />
      </div>
      <div className="col-span-2 ">
        <OrganizationList
          id_token={id_token}
          organizations={organizations}
          user={user}
        />
      </div>
    </div>
  )
}

export default OrganizationLookup
