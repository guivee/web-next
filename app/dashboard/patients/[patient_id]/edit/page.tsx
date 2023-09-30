import Unauthenticated from '../../../../auth/{components}/unauthenticated'
import { getAuthUser } from '../../../../auth/{util}/user_util'

import { getLoggedInUser } from '../../../../{lib}/service-utils'
import { User } from '../../../../{lib}/acl_types'
import { readPatient } from '../../../../../src/service/patient-service'
import { Patient } from '../../../{util}/patient_types'
import ValidateDemographicsForm from '../../{components}/validate-demographics-form'
import ValidateIhiForm from '../../{components}/validate-ihi-form'
import ValidateMedicareForm from '../../{components}/validate-medicare-form'
import ValidateDvaForm from '../../{components}/validate-dva-form'
import ValidateAddressForm from '../../{components}/validate-address-form'

interface EditPageProps {
  searchParams: Record<string, string>
}

const EditPage = async ({ params }: { params: { patient_id: string } }) => {
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

  const patient: Patient = response?.data?.patient

  return (
    <div className="flex flex-col gap-4 pb-12">
      <ValidateIhiForm patient={patient} id_token={id_token} />
      <ValidateDemographicsForm patient={patient} id_token={id_token} />
      <ValidateMedicareForm patient={patient} id_token={id_token} />
      <ValidateDvaForm patient={patient} id_token={id_token} />
      {/* <ValidateAddressForm patient={patient} id_token={id_token} /> */}
    </div>
  )
}

export default EditPage
