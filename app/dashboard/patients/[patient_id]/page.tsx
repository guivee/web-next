import {
  readPatient,
  readPatients,
} from '../../../../src/service/patient-service'
import Unauthenticated from '../../../auth/{components}/unauthenticated'
import { getAuthUser } from '../../../auth/{util}/user_util'
import { User } from '../../../{lib}/acl_types'
import { getLoggedInUser } from '../../../{lib}/service-utils'
import { Patient } from '../../{util}/patient_types'
import PateintDetailsComponent from '../{components}/patient-details'

const PatientPage = async ({ params }: { params: { patient_id: string } }) => {
  const { patient_id } = params

  const { id_token } = getAuthUser()

  if (!id_token) return <Unauthenticated />

  const resp = await getLoggedInUser(id_token)

  const user: User = resp.data

  const response = await readPatient(
    user?.organization_id,
    patient_id,
    id_token
  )

  console.log('PatientPage: response: ', response)

  const patient: Patient = response?.data?.patient

  return (
    <div>
      <PateintDetailsComponent patient={patient} />
    </div>
  )
}

export default PatientPage
