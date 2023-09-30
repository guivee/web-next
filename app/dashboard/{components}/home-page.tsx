'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import FormPanelComponent from '../../{components}/form-panel-component'
import { RoleEnum, User } from '../../{lib}/acl_types'
import { ORGANIZATION_LINK, USERS_LINK } from '../../{lib}/links'

interface HomePageGrid {
  key: string
  header: string
  content: string
  idle: string
  url: string
  roles: RoleEnum[]
}

const Home_PAGE_GRID_MAP: HomePageGrid[] = [
  {
    key: 'setUpOrg',
    header: 'Setup Organisation',
    content: 'Please setup your organization to start using Parchment.',
    idle: 'Setup Organization',
    url: ORGANIZATION_LINK,
    roles: [RoleEnum.OWNER],
  },
  {
    key: 'inviteProviders',
    header: 'Invite Providers',
    content:
      "You can invite Doctors in your Organization who would like to use Parchment's e-prescription service.",
    idle: 'Invite Providers',
    url: USERS_LINK,
    roles: [RoleEnum.OWNER, RoleEnum.ADMIN],
  },
  {
    key: 'validate',
    header: 'Validate Provider Details',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    idle: 'Validate Details',
    url: USERS_LINK,
    roles: [RoleEnum.DOCTOR],
  },
]

interface HomePageProps {
  user: User
  users: User[]
}

const HomePage = ({ user, users }: HomePageProps) => {
  // const users = await getUsers()
  return (
    <div className="mx-4 mt-9 flex flex-col gap-16">
      {Home_PAGE_GRID_MAP.map((homePageGrid: HomePageGrid) => {
        if (user.access_roles.some((role) => homePageGrid.roles.includes(role)))
          return (
            <div key={homePageGrid.header}>
              <FormGrid homePageGrid={homePageGrid} />
            </div>
          )
      })}
    </div>
  )
}

const FormGrid = ({ homePageGrid }: { homePageGrid: HomePageGrid }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const router = useRouter()
  const { handleSubmit } = useForm()

  const { header, content, idle, url } = homePageGrid
  const onSubmit = () => {
    setIsSubmitting(true)
    router.push(url)
  }

  return (
    <FormPanelComponent
      header={header}
      body={<div>{content}</div>}
      handleSubmit={handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
      footer={{ idle, submitting: 'Redirecting' }}
    />
  )
}

const isVisible = (key: string, user: User, users: User[]) => {
  if ((key = 'setUpOrg')) return true //TBD: check hpio
  if ((key = 'inviteProviders')) {
    return !users.some((user) => user.access_roles.includes(RoleEnum.DOCTOR))
  }
}

export default HomePage
