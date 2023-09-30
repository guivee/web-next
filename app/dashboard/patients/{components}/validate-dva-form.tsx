'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import FormPanelComponent from '../../../{components}/form-panel-component'
import { Action, Patient } from '../../{util}/patient_types'
import {
  updatePatient,
  updatePatientIdentifier,
} from '../../../../src/service/patient-service'
import ActionDialogComponent from '../../../{components}/action-dialog-component'
import { use, useEffect, useState } from 'react'
import StackedInput from '../../../{components}/stacked-input'

interface ValidateDvaFormProps {
  patient: Patient
  id_token: string
}

type FormValues = {
  dva_file_number: string
}

const ValidateDvaForm = ({ patient, id_token }: ValidateDvaFormProps) => {
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
    setValue('dva_file_number', patient.dva_file_number || '')
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
        header={'DVA '}
        body={<Body register={register} patient={patient} />}
        handleSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
      />
      <ActionDialogComponent action={action} conflicts={conflicts} />
    </>
  )
}

export default ValidateDvaForm

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
            field="dva_file_number"
            label="Dva Number"
          />
        </div>
      </div>
    </>
  )
}
