'use client'

import { createPatient } from '../../../../src/service/patient-service'
import { User } from '../../../{lib}/acl_types'
import ActionDialogComponent from '../../../{components}/action-dialog-component'
import { Action } from '../../../{lib}/types'
import { useState } from 'react'
import { Patient } from '../../{util}/patient_types'
import { PatientLookupList } from './patient-lookup-list'
import { useRouter } from 'next/navigation'
import { ServerResponse } from '../../{util}/basic-utils'

export default function PatientList({
  patients,
  id_token,
  user,
}: {
  patients: Patient[]
  id_token: string
  user: User
}) {
  const [action, setAction] = useState<Action>({
    notify: { value: false, message: '' },
  })

  const router = useRouter()

  const [conflicts, setConflicts] = useState<Patient[]>([])

  const onPatientRowClicked = async (patient: Patient) => {
    const serverResponse: ServerResponse = await createPatient(
      user.organization_id,
      id_token,
      patient
    )

    //todo
    // if (response.status === 'success') {
    //   router.push(BUILD_PATIENT_PROFILE_LINK(response.data.patient?.patient_id))
    // }

    handleResponseAlerts(serverResponse)
  }

  const handleResponseAlerts = (response: ServerResponse) => {
    const action: Action = response?.data.action
    const conflicting_patients = response?.data.conflicting_patients
    setAction(action)
    setConflicts(conflicting_patients)
  }

  return (
    <>
      <PatientLookupList
        patients={patients}
        onPatientRowClicked={onPatientRowClicked}
        option={'LONG'}
      />
      <ActionDialogComponent action={action} conflicts={conflicts} />
    </>
  )
}
