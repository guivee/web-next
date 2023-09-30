'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import FormPanelComponent from '../../../{components}/form-panel-component'
import { Action, AustralianAddress, Patient } from '../../{util}/patient_types'
import {
  revalidatePatient,
  updatePatient,
} from '../../../../src/service/patient-service'
import ActionDialogComponent from '../../../{components}/action-dialog-component'
import { use, useEffect, useState } from 'react'
import { capitalizeFirstLetterOfAllWords } from '../../{util}/basic-utils'
import StackedInput from '../../../{components}/stacked-input'

interface ValidateAddressFormProps {
  patient: Patient
  id_token: string
}

type FormValues = AustralianAddress

const ValidateAddressForm = ({
  patient,
  id_token,
}: ValidateAddressFormProps) => {
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
    const australian_address: AustralianAddress =
      patient?.australian_address || {
        street_number: '',
        street_name: '',
        suburb: '',
        state: '',
        postcode: '',
      }

    setValue('street_number', australian_address?.street_number || '')
    setValue('street_name', australian_address?.street_name || '')
    setValue('suburb', australian_address?.suburb || '')
    setValue('state', australian_address?.state || '')
    setValue('postcode', australian_address?.postcode || '')
  }, [patient])

  const [conflicts, setConflicts] = useState<Patient[]>([])
  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    const body = data
    const response = await updatePatient(
      patient.organization_id || '',
      patient.patient_id || '',
      true,
      body,
      id_token
    )

    handleResponseAlerts(response.data)
  }

  const handleResponseAlerts = (response: any) => {
    const action: Action = response?.action
    const conflicting_patients = response?.conflicting_patients
    setAction(action)
    setConflicts(conflicting_patients)
  }

  return (
    <>
      <FormPanelComponent
        footer={{ idle: 'Re-Validate', submitting: 'Re-Validating' }}
        header={'Address'}
        body={<Body register={register} patient={patient} />}
        handleSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
      />
      <ActionDialogComponent action={action} conflicts={conflicts} />
    </>
  )
}

export default ValidateAddressForm

interface BodyProps {
  register: any
  patient: Patient
}

function Body({ register, patient }: BodyProps) {
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-8 gap-6">
          <StackedInput
            register={register}
            field="street_number"
            label="Street Number"
          />

          <StackedInput
            register={register}
            field="street_name"
            label="Street Name"
          />

          <StackedInput register={register} field="suburb" label="Suburb" />
          <StackedInput register={register} field="state" label="State" />
          <StackedInput register={register} field="postcode" label="Postcode" />
        </div>
      </div>
    </>
  )
}
