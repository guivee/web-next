'use client'

import { ACCOUNT_LOOKUP_LINK, DASHBOARD_LINK } from '../../../../{lib}/links'
import Link from 'next/link'

const ProviderLookupPanel = () => {
  return (
    <div className="flex items-center justify-between pb-5">
      <div className="br-label">Lookup provider via Health Services</div>
      <Link
        className="rounded-md bg-primary-400 px-4 py-3 text-sm text-primary-800"
        href={ACCOUNT_LOOKUP_LINK}
      >
        LOOKUP PROVIDER
      </Link>
    </div>
  )
}

export default ProviderLookupPanel
