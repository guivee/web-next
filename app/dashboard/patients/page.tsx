import { readPatients } from '../../../src/service/patient-service'
import Unauthenticated from '../../auth/{components}/unauthenticated'
import { getAuthUser } from '../../auth/{util}/user_util'
import { User } from '../../{lib}/acl_types'
import { getLoggedInUser } from '../../{lib}/service-utils'
import { Patient } from '../{util}/patient_types'
import PatientList from './{components}/patient-grid'

const PatientsPage = async () => {
  const { id_token } = getAuthUser()

  if (!id_token) return <Unauthenticated />

  const resp = await getLoggedInUser(id_token)

  const user: User = resp.data

  console.log('PatientsPage: user: ', user)

  const response = await readPatients(user?.organization_id, id_token)

  const patients: Patient[] = response.data?.patients

  return (
    <div className="mb-5">
      <PatientList patients={patients} />
    </div>
  )
}

export default PatientsPage
