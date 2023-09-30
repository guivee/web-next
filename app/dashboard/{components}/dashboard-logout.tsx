'use client'

import React from 'react'
import BrButton from '../../{components}/pm-button'
import { useContext } from 'react'
import { AmplifyUserContext } from '../../auth/{components}/useAmplifyUser'
import { User } from '../../{lib}/acl_types'
import { getFirstName } from '../../{lib}/utils'

export function DashboardLogout({ user }: { user: User }) {
  return (
    <div className="mx-auto mt-10  rounded-2xl  border bg-gray-100 px-20 py-10">
      Welcome home {getFirstName(user?.full_name)}!
    </div>
  )
}
