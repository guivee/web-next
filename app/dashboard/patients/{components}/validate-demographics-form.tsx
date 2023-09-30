'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import FormPanelComponent from '../../../{components}/form-panel-component'
import { Action, Patient } from '../../{util}/patient_types'
import {
  revalidatePatient,
  updatePatient,
} from '../../../../src/service/patient-service'
import ActionDialogComponent from '../../../{components}/action-dialog-component'
import { use, useEffect, useState } from 'react'
import StackedInput from '../../../{components}/stacked-input'

interface ValidateDemographicsFormProps {
  patient: Patient
  id_token: string
}

type FormValues = {
  family_name: string
  given_name: string
  date_of_birth: string
  sex: string
}

const ValidateDemographicsForm = ({
  patient,
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
    setValue('family_name', patient.family_name)
    setValue('given_name', patient.given_name || '')
    setValue('date_of_birth', patient.date_of_birth)
    setValue('sex', patient.sex)
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
        header={'Demographics'}
        body={<Body register={register} patient={patient} />}
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
  patient: Patient
}

function Body({ register, patient }: BodyProps) {
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
