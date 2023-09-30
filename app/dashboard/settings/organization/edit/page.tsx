import Unauthenticated from '../../../../auth/{components}/unauthenticated'
import { getAuthUser } from '../../../../auth/{util}/user_util'

import { getLoggedInUser } from '../../../../{lib}/service-utils'
import { User } from '../../../../{lib}/acl_types'
import ValidateHPIOForm from '../{components}/validate-hpio-form'
import { readOrganization } from '../../../../../src/service/user-service'

const EditPage = async () => {
  const { id_token } = getAuthUser()
  if (!id_token) return <Unauthenticated />

  const resp = await getLoggedInUser(id_token)
  const user: User = resp.data

  const organizationResponse = await readOrganization(
    user.organization_id,
    id_token
  )

  const organization = organizationResponse.data

  if (!organization) return <div>Organization not found</div>

  return <ValidateHPIOForm organization={organization} id_token={id_token} />
}

export default EditPage
