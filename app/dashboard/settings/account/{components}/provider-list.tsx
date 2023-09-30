'use client'

import { useState } from 'react'
import { createProvider } from '../../../../../src/service/user-service'
import ActionDialogComponent from '../../../../{components}/action-dialog-component'
import { User } from '../../../../{lib}/acl_types'
import { Provider } from '../../../../{lib}/provider_types'
import { ServerResponse } from '../../../{util}/basic-utils'
import { Action } from '../../../{util}/patient_types'
import { ProviderLookupList } from './provider-lookup-list'
import { useRouter } from 'next/navigation'

export default function ProviderList({
  providers,
  id_token,
  user,
}: {
  providers: Provider[]
  id_token: string
  user: User
}) {
  const [action, setAction] = useState<Action>({
    notify: { value: false, message: '' },
  })

  const router = useRouter()

  const [conflicts, setConflicts] = useState<Provider[]>([])

  const onProviderRowClicked = async (provider: Provider) => {
    const serverResponse: ServerResponse = await createProvider(
      user.organization_id,
      id_token,
      provider
    )

    handleResponseAlerts(serverResponse)
  }

  const handleResponseAlerts = (response: ServerResponse) => {
    const action: Action = response?.data.action
    const conflicting_providers = response?.data.conflicting_providers
    setAction(action)
    setConflicts(conflicting_providers)
  }

  return (
    <>
      <ProviderLookupList
        providers={providers}
        onProviderRowClicked={onProviderRowClicked}
        option={'LONG'}
      />
      <ActionDialogComponent action={action} conflicts={conflicts} />
    </>
  )
}
