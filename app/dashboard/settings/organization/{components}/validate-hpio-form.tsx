'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'
import ActionDialogComponent from '../../../../{components}/action-dialog-component'
import FormPanelComponent from '../../../../{components}/form-panel-component'
import { Action } from '../../../{util}/patient_types'
import { Organization } from '../../../../{lib}/provider_types'
import { revalidateOrganization } from '../../../../../src/service/user-service'

interface ValidateHPIOFormProps {
  organization: Organization
  id_token: string
}

type FormValues = {
  ihi_number: string
}

const ValidateHPIOForm = ({
  organization,
  id_token,
}: ValidateHPIOFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>()
  const [action, setAction] = useState<Action>({
    notify: { value: false, message: '' },
  })

  const [conflicts, setConflicts] = useState<Organization[]>([])
  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    console.log('organization.organization_id', organization.organization_id)
    const response = await revalidateOrganization(
      organization.organization_id || '',
      id_token
    )

    handleResponseAlerts(response.data)
  }

  const handleResponseAlerts = (response: any) => {
    const action: Action = response?.action
    const conflicting_organizations = response?.conflicting_organizations
    setAction(action)
    setConflicts(conflicting_organizations)
  }

  return (
    <>
      <FormPanelComponent
        footer={{ idle: 'Re-Validate', submitting: 'Re-Validating' }}
        header={'HPIO Number'}
        body={<Body register={register} organization={organization} />}
        handleSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
      />
      <ActionDialogComponent action={action} conflicts={conflicts} />
    </>
  )
}

export default ValidateHPIOForm

interface BodyProps {
  register: any
  organization: Organization
}

function Body({ register, organization }: BodyProps) {
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-4">
            <label
              htmlFor="abn"
              className="block text-sm font-medium text-gray-700"
            >
              HPIO #
            </label>
            <label className="br-label w-48">{organization.hpio_number}</label>
          </div>
        </div>
      </div>
    </>
  )
}
