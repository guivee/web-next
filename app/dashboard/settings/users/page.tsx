import { InviteUserWrapper } from './{component}/invite-user-wrapper'
import Unauthenticated from '../../../auth/{components}/unauthenticated'
import { getAuthUser, getUsers } from '../../../auth/{util}/user_util'
import { canEditUsersRoles, RoleEnum, User } from '../../../{lib}/acl_types'
import { CurrencyDollarIcon } from '@heroicons/react/20/solid'
import {
  capitalizeFirstLetter,
  capitalizeFirstLetterOfAllWords,
} from '../../{util}/basic-utils'
import EditOrgUserButton from './{component}/edit-org-user-button'
import { getLoggedInUser } from '../../../{lib}/service-utils'

const UsersPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const { id_token } = getAuthUser()

  if (!id_token) return <Unauthenticated />

  let resp = await getLoggedInUser(id_token)
  const loggedInUser: User = resp.data

  if (!loggedInUser || !loggedInUser.organization_id) return <Unauthenticated />

  // TODO: Set current Org at the top level

  const organization_id = loggedInUser.organization_id
  resp = await getUsers(id_token, organization_id)

  const users: User[] = resp?.data ? resp.data : []

  if (!users) return <Unauthenticated />

  console.log('DashboardSettings: users: ', users)

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, email
            and role etc.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          {canEditUsersRoles(loggedInUser) && (
            <InviteUserWrapper {...{ organization_id }} />
          )}
        </div>
      </div>
      <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Name
              </th>
              {/* <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Title
              </th> */}
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Role
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {users.map((user) => (
              <tr key={user.user_id}>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                  {capitalizeFirstLetterOfAllWords(user.full_name)}
                  <dl className="font-normal lg:hidden">
                    {/* <dt className="sr-only">Title</dt>
                    <dd className="mt-1 truncate text-gray-700">
                      {person.title}
                    </dd> */}
                    <dt className="sr-only sm:hidden">Email</dt>
                    <dd className="mt-1 truncate text-gray-500 sm:hidden">
                      {user.email}
                    </dd>
                  </dl>
                </td>
                {/* <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {person.title}
                </td> */}
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {user.email}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  <RoleCell access_roles={user.access_roles} />
                </td>
                <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  {canEditUsersRoles(loggedInUser) && (
                    <EditOrgUserButton user={user} id_token={id_token} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const RoleCell = ({ access_roles }: { access_roles: RoleEnum[] }) => {
  if (!access_roles || access_roles.length == 0 || !Array.isArray(access_roles))
    return <></>

  // sort roles
  access_roles.sort((a, b) => {
    if (a == RoleEnum.ADMIN) return -1
    if (b == RoleEnum.ADMIN) return 1
    if (a == RoleEnum.DOCTOR) return -1
    if (b == RoleEnum.DOCTOR) return 1
    if (a == RoleEnum.RECEPTIONIST) return -1
    if (b == RoleEnum.RECEPTIONIST) return 1
    return 0
  })
  return (
    <div className="flex space-x-1">
      {access_roles.map((role, i) => {
        const role_name = role.replace(/_/g, ' ')
        return (
          <span
            key={i}
            className=" inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-green-800"
          >
            {role_name.toLowerCase() == RoleEnum.DOCTOR && (
              <CurrencyDollarIcon
                className=" h-3 w-3 text-secondary-400"
                aria-hidden="true"
              />
            )}
            {capitalizeFirstLetter(role_name.toLowerCase())}
          </span>
        )
      })}
    </div>
  )
}

export default UsersPage
