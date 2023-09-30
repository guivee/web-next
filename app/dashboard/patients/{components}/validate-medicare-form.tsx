'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import FormPanelComponent from '../../../{components}/form-panel-component'
import { Action, Patient } from '../../{util}/patient_types'
import {
  revalidatePatient,
  updatePatient,
  updatePatientIdentifier,
} from '../../../../src/service/patient-service'
import ActionDialogComponent from '../../../{components}/action-dialog-component'
import { use, useEffect, useState } from 'react'
import { capitalizeFirstLetterOfAllWords } from '../../{util}/basic-utils'
import StackedInput from '../../../{components}/stacked-input'

interface ValidateMedicareFormProps {
  patient: Patient
  id_token: string
}

type FormValues = {
  medicare_card_number: string
  medicare_irn: string
}

const ValidateMedicareForm = ({
  patient,
  id_token,
}: ValidateMedicareFormProps) => {
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
    setValue('medicare_card_number', patient.medicare_card_number || '')
    setValue('medicare_irn', patient.medicare_irn || '')
  }, [patient])

  const [conflicts, setConflicts] = useState<Patient[]>([])
  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    const body = data
    const response = await updatePatientIdentifier(
      patient.organization_id || '',
      patient.patient_id || '',
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
        header={'Medicare card details'}
        body={<Body register={register} patient={patient} />}
        handleSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
      />
      <ActionDialogComponent action={action} conflicts={conflicts} />
    </>
  )
}

export default ValidateMedicareForm

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
            field="medicare_card_number"
            label="Medicare Card Number"
          />

          <StackedInput
            register={register}
            field="medicare_irn"
            label="Medicare IRN"
          />
        </div>
      </div>
    </>
  )
}
