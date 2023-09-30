import { readPatient } from '../../../../../src/service/patient-service'
import { readProvider } from '../../../../../src/service/user-service'
import Unauthenticated from '../../../../auth/{components}/unauthenticated'
import { getAuthUser } from '../../../../auth/{util}/user_util'
import FormPanelComponent from '../../../../{components}/form-panel-component'
import { User } from '../../../../{lib}/acl_types'
import { Provider } from '../../../../{lib}/provider_types'
import { getLoggedInUser } from '../../../../{lib}/service-utils'
import { ServerResponse } from '../../../{util}/basic-utils'
import { Patient } from '../../../{util}/patient_types'
import ValidateDemographicsForm from '../{components}/validate-demographics-form'
import ValidateHPIIForm from '../{components}/validate-hpii-form'

const EditPage = async () => {
  const { id_token } = getAuthUser()
  if (!id_token) return <Unauthenticated />

  const resp = await getLoggedInUser(id_token)
  const user: User = resp.data

  let provider: Provider | null = null

  if (user.provider_id) {
    const providerResp: ServerResponse = await readProvider(
      user.organization_id,
      user.provider_id,
      id_token
    )
    provider = providerResp.data.provider

    console.log('Account: provider: ', provider)
  }

  if (!provider) return <div>Provider not found</div>

  return (
    <div className="flex flex-col gap-4 pb-12">
      <ValidateHPIIForm provider={provider} id_token={id_token} />
      <ValidateDemographicsForm provider={provider} id_token={id_token} />
    </div>
  )
}

export default EditPage
