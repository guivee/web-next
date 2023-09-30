import Unauthenticated from '../auth/{components}/unauthenticated'
import {
  getAuthUser,
  getUsers,
  getUserSubscription,
} from '../auth/{util}/user_util'
import { User } from '../{lib}/acl_types'
import { getLoggedInUser } from '../{lib}/service-utils'
import { SUBSCRIPTION_STATUS } from '../{lib}/types'

import HomePage from './{components}/home-page'
import Subscription from './{components}/subscription'

const DashboardPage = async () => {
  const { id_token } = getAuthUser()

  if (!id_token) return <Unauthenticated />

  const resp = await getLoggedInUser(id_token)

  const user: User = resp.data

  console.log('DashboardPage: user: ', user)

  if (!user) return <Unauthenticated />

  const subscription = await getUserSubscription(user?.subscription_id)
  // subscription.status = 'trialing' // for testing
  if (
    subscription.status == SUBSCRIPTION_STATUS.ACTIVE ||
    subscription.status == SUBSCRIPTION_STATUS.TRIALING
  ) {
    const users = await getUsers(id_token, user.organization_id)
    return <HomePage user={user} users={users} />
  } else return <Subscription user_id={user.user_id} />
}

export default DashboardPage
