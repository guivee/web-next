'use client'

import { useState } from 'react'
import ActionDialogComponent from '../../../../{components}/action-dialog-component'
import { User } from '../../../../{lib}/acl_types'
import { ServerResponse } from '../../../{util}/basic-utils'
import { Action } from '../../../{util}/patient_types'
import { useRouter } from 'next/navigation'
import { Organization } from '../../../../{lib}/provider_types'
import { OrganizationLookupList } from './organization-lookup-list'
import { updateOrganization } from '../../../../../src/service/user-service'

export default function OrganizationList({
  organizations,
  id_token,
  user,
}: {
  organizations: Organization[]
  id_token: string
  user: User
}) {
  const [action, setAction] = useState<Action>({
    notify: { value: false, message: '' },
  })

  const router = useRouter()

  const [conflicts, setConflicts] = useState<Organization[]>([])

  const onOrganizationRowClicked = async (organization: Organization) => {
    const serverResponse: ServerResponse = await updateOrganization(
      user.organization_id,
      organization,
      id_token
    )
    handleResponseAlerts(serverResponse)
  }

  const handleResponseAlerts = (response: ServerResponse) => {
    const action: Action = response?.data.action
    const conflicting_organizations = response?.data.conflicting_organizations
    setAction(action)
    setConflicts(conflicting_organizations)
  }

  return (
    <>
      <OrganizationLookupList
        organizations={organizations}
        onOrganizationRowClicked={onOrganizationRowClicked}
        option={'LONG'}
      />
      <ActionDialogComponent action={action} conflicts={conflicts} />
    </>
  )
}
