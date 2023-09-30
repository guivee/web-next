import Unauthenticated from '../../../auth/{components}/unauthenticated'
import { getAuthUser } from '../../../auth/{util}/user_util'
import { User } from '../../../{lib}/acl_types'
import { getLoggedInUser } from '../../../{lib}/service-utils'
import StripeCustomerPortal from './../{component}/stripe-customer-portal'

const BillingPage = async () => {
  const { id_token } = getAuthUser()

  if (!id_token) return <Unauthenticated />

  const resp = await getLoggedInUser(id_token)
  const user: User = resp.data
  return (
    <>
      <StripeCustomerPortal
        url={process.env.STRIPE_CUSTOMER_PORTAL_URL || ''}
        email={user?.subscription_customer_details?.email || ''}
      />
    </>
  )
}

export default BillingPage
