'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import FormPanelComponent from '../../../{components}/form-panel-component'
import { Action, Patient } from '../../{util}/patient_types'
import { revalidatePatient } from '../../../../src/service/patient-service'
import ActionDialogComponent from '../../../{components}/action-dialog-component'
import { useState } from 'react'

interface ValidateIhiFormProps {
  patient: Patient
  id_token: string
}

type FormValues = {
  ihi_number: string
}

const ValidateIhiForm = ({ patient, id_token }: ValidateIhiFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>()
  const [action, setAction] = useState<Action>({
    notify: { value: false, message: '' },
  })

  const [conflicts, setConflicts] = useState<Patient[]>([])
  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    const response = await revalidatePatient(
      patient.organization_id || '',
      patient.patient_id || '',
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
        header={'IHI Number'}
        body={<Body register={register} patient={patient} />}
        handleSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
      />
      <ActionDialogComponent action={action} conflicts={conflicts} />
    </>
  )
}

export default ValidateIhiForm

interface BodyProps {
  register: any
  patient: Patient
}

function Body({ register, patient }: BodyProps) {
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-4">
            <label
              htmlFor="abn"
              className="block text-sm font-medium text-gray-700"
            >
              IHI #
            </label>
            <label className="br-label w-48">{patient.ihi_number}</label>
            {/* <input
              {...register('ihi_number')}
              className="br-input w-48"
              value={patient.ihi_number}
            /> */}
          </div>
        </div>
      </div>
    </>
  )
}
