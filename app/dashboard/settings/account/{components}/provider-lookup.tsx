'use client'

import { useState } from 'react'

import { User } from '../../../../{lib}/acl_types'
import ProviderList from './provider-list'
import SearchProviderComponent from './search-provider-component'
import { Provider } from '../../../../{lib}/provider_types'

interface ProviderLookupProps {
  id_token: string
  user: User
}

const ProviderLookup = ({ id_token, user }: ProviderLookupProps) => {
  const [providers, setProviders] = useState<Provider[]>([])

  return (
    <div className="mt-10 mb-5 grid grid-cols-2 gap-5 p-2 sm:mt-0">
      <div className="col-span-2 lg:col-span-2">
        <SearchProviderComponent
          id_token={id_token}
          setProviders={setProviders}
          user={user}
        />
      </div>
      <div className="col-span-2 ">
        <ProviderList id_token={id_token} providers={providers} user={user} />
      </div>
    </div>
  )
}

export default ProviderLookup
