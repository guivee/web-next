import Unauthenticated from '../auth/{components}/unauthenticated'
import { getAuthUser } from '../auth/{util}/user_util'
import { User } from '../{lib}/acl_types'
import { getLoggedInUser } from '../{lib}/service-utils'
import DashboardShell from './{components}/dashboard-shell'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { id_token } = getAuthUser()

  if (!id_token) {
    return <Unauthenticated />
  }
  const resp = await getLoggedInUser(id_token)
  const user: User = resp.data

  console.log('DashboardLayout: user: ', user)

  return (
    <>
      <DashboardShell user={user}>{children} </DashboardShell>
    </>
  )
}
