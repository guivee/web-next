import Unauthenticated from '../../../auth/{components}/unauthenticated'
import { getAuthUser } from '../../../auth/{util}/user_util'
import { User } from '../../../{lib}/acl_types'
import { readOrganization } from '../../../../src/service/user-service'
import { getLoggedInUser } from '../../../{lib}/service-utils'
import OrganizationDetails from './{components}/organization-details'
import OrganizationLookup from './{components}/organization-lookup'

const OrganizationPage = async () => {
  const { id_token } = getAuthUser()

  if (!id_token) return <Unauthenticated />

  const resp = await getLoggedInUser(id_token)

  const user: User = resp.data

  if (!user) return <Unauthenticated />

  const organizationResponse = await readOrganization(
    user.organization_id,
    id_token
  )

  const organization = organizationResponse.data

  if (!organization) return <div>Organization not found</div>

  if (!organization.hpio_number)
    return <OrganizationLookup id_token={id_token} user={user} />

  return <OrganizationDetails organization={organization} />
}

export default OrganizationPage
