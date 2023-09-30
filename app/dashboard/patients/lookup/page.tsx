import { SearchHIIComponent } from '../{components}/search-hii-component'
import Unauthenticated from '../../../auth/{components}/unauthenticated'
import { getAuthUser } from '../../../auth/{util}/user_util'
import PatientList from '../{components}/patient-list'
import PatientLookup from '../{components}/patient-lookup'
import { getLoggedInUser } from '../../../{lib}/service-utils'
import { User } from '../../../{lib}/acl_types'

const LookupPage = async () => {
  const { id_token } = getAuthUser()
  if (!id_token) return <Unauthenticated />

  const resp = await getLoggedInUser(id_token)
  const user: User = resp.data
  return (
    <>
      <PatientLookup id_token={id_token} user={user} />
    </>
  )
}

export default LookupPage
