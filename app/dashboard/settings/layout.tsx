import { getAuthUser } from '../../auth/{util}/user_util'
import Unauthenticated from '../../auth/{components}/unauthenticated'
import { getLoggedInUser } from '../../{lib}/service-utils'
import { User } from '../../{lib}/acl_types'
import SettingsShell from './{component}/settings-shell'

const SettingsLayout = async (props: any) => {
  const { children } = props
  const { id_token } = getAuthUser()

  if (!id_token) {
    return <Unauthenticated />
  }
  const resp = await getLoggedInUser(id_token)
  const user: User = resp.data

  console.log('DashboardLayout: user: ', user)
  const renderSettingsShell = async () => {
    const resolvedSettingsShell = await SettingsShell({ children, user })

    return resolvedSettingsShell
  }
  return <>{renderSettingsShell()}</>
}

export default SettingsLayout
