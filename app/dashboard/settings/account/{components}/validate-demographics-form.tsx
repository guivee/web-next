'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { Provider } from '../../../../{lib}/provider_types'
import { useState, useEffect } from 'react'
import ActionDialogComponent from '../../../../{components}/action-dialog-component'
import FormPanelComponent from '../../../../{components}/form-panel-component'
import StackedInput from '../../../../{components}/stacked-input'
import { Action } from '../../../{util}/patient_types'
import { updateProvider } from '../../../../../src/service/user-service'

interface ValidateDemographicsFormProps {
  provider: Provider
  id_token: string
}

type FormValues = {
  family_name: string
  given_name: string
  date_of_birth: string
  sex: string
}

const ValidateDemographicsForm = ({
  provider,
  id_token,
}: ValidateDemographicsFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>()
  const [action, setAction] = useState<Action>({
    notify: { value: false, message: '' },
  })

  useEffect(() => {
    setValue('family_name', provider.family_name)
    setValue('given_name', provider.given_name || '')
    setValue('date_of_birth', provider.date_of_birth)
    setValue('sex', provider.sex)
  }, [provider])

  const [conflicts, setConflicts] = useState<Provider[]>([])
  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    const body = data
    const response = await updateProvider(
      provider.organization_id || '',
      provider.provider_id || '',
      body,
      true,
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
        header={'Demographics'}
        body={<Body register={register} provider={provider} />}
        handleSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
      />
      <ActionDialogComponent action={action} conflicts={conflicts} />
    </>
  )
}

export default ValidateDemographicsForm

interface BodyProps {
  register: any
  provider: Provider
}

function Body({ register, provider }: BodyProps) {
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-8 gap-6">
          <StackedInput
            register={register}
            field="family_name"
            label="Family Name"
          />

          <StackedInput
            register={register}
            field="given_name"
            label="Given Name"
          />

          <StackedInput register={register} field="date_of_birth" label="DOB" />

          <StackedInput register={register} field="sex" label="Gender" />
        </div>
      </div>
    </>
  )
}
