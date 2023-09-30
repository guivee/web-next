import Unauthenticated from '../../../auth/{components}/unauthenticated'
import { getAuthUser } from '../../../auth/{util}/user_util'
import { User } from '../../../{lib}/acl_types'
import { isDoctor } from '../../../{lib}/utils'
import { getLoggedInUser } from '../../../{lib}/service-utils'
import ProviderList from './{components}/provider-grid'
import ProviderSecurityForm from './{components}/provider-security-form'
import ProviderLookupPanel from './{components}/provider-lookup-panel'
import ProviderDetails from './{components}/provider-details'
import { readProvider } from '../../../../src/service/user-service'
import { ServerResponse } from '../../{util}/basic-utils'
import { Provider } from '../../../{lib}/provider_types'

const AccountPage = async () => {
  const { id_token } = getAuthUser()

  if (!id_token) return <Unauthenticated />

  const resp = await getLoggedInUser(id_token)

  const user: User = resp.data

  if (!user) return <Unauthenticated />

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

  return (
    <div className="flex flex-col gap-4">
      <ProviderPanel user={user} provider={provider} />
      <ProviderSecurityForm user={user} id_token={id_token} />
    </div>
  )
}

const ProviderPanel = ({
  user,
  provider,
}: {
  user: User
  provider: Provider | null
}) => {
  if (isDoctor(user)) {
    if (user.provider_id && provider) {
      // show provider info
      return <ProviderDetails provider={provider} />
    } else {
      // show lookup form
      return (
        <>
          <ProviderLookupPanel />
        </>
      )
    }
  } else {
    // show only non doctor forms
    return <>show only non doctor forms</>
  }
}

export default AccountPage
