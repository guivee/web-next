'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'
import { Provider } from '../../../../{lib}/provider_types'
import ActionDialogComponent from '../../../../{components}/action-dialog-component'
import FormPanelComponent from '../../../../{components}/form-panel-component'
import { Action } from '../../../{util}/patient_types'
import { revalidateProvider } from '../../../../../src/service/user-service'

interface ValidateHPIIFormProps {
  provider: Provider
  id_token: string
}

type FormValues = {
  ihi_number: string
}

const ValidateHPIIForm = ({ provider, id_token }: ValidateHPIIFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>()
  const [action, setAction] = useState<Action>({
    notify: { value: false, message: '' },
  })

  const [conflicts, setConflicts] = useState<Provider[]>([])
  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    const response = await revalidateProvider(
      provider.organization_id || '',
      provider.provider_id || '',
      id_token
    )

    handleResponseAlerts(response.data)
  }

  const handleResponseAlerts = (response: any) => {
    const action: Action = response?.action
    const conflicting_providers = response?.conflicting_providers
    setAction(action)
    setConflicts(conflicting_providers)
  }

  return (
    <>
      <FormPanelComponent
        footer={{ idle: 'Re-Validate', submitting: 'Re-Validating' }}
        header={'IHI Number'}
        body={<Body register={register} provider={provider} />}
        handleSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
      />
      <ActionDialogComponent action={action} conflicts={conflicts} />
    </>
  )
}

export default ValidateHPIIForm

interface BodyProps {
  register: any
  provider: Provider
}

function Body({ register, provider }: BodyProps) {
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-4">
            <label
              htmlFor="abn"
              className="block text-sm font-medium text-gray-700"
            >
              HPII #
            </label>
            <label className="br-label w-48">{provider.hpii_number}</label>
            {/* <input
              {...register('ihi_number')}
              className="br-input w-48"
              value={provider.ihi_number}
            /> */}
          </div>
        </div>
      </div>
    </>
  )
}
