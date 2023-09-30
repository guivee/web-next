import Unauthenticated from '../../../../auth/{components}/unauthenticated'
import { getAuthUser } from '../../../../auth/{util}/user_util'
import { getLoggedInUser } from '../../../../{lib}/service-utils'
import { User } from '../../../../{lib}/acl_types'

import ProviderLookup from '../{components}/provider-lookup'

const LookupPage = async () => {
  const { id_token } = getAuthUser()
  if (!id_token) return <Unauthenticated />

  const resp = await getLoggedInUser(id_token)
  const user: User = resp.data
  return (
    <>
      <ProviderLookup id_token={id_token} user={user} />
    </>
  )
}

export default LookupPage
