'use client'

import { useState } from 'react'
import InviteUserModal from './invite-user-modal'
export function InviteUserWrapper({
  organization_id,
}: {
  organization_id: string
}) {
  const [toggle, setToggle] = useState(false)

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto" // onClick={addUserHandler}
        onClick={() => setToggle(true)}
      >
        Invite user
      </button>
      <InviteUserModal {...{ organization_id, toggle, setToggle }} />
    </>
  )
}
