'use client'
import { useState } from 'react'
import { User } from '../../../../{lib}/acl_types'
import EditUserModal from './edit-user-modal'

const EditOrgUserButton = ({
  user,
  id_token,
}: {
  user: User
  id_token: string
}) => {
  const [showModal, setShowModal] = useState(false)

  const editOnClickHandler = (user: User) => {
    setShowModal(true)
    // console.log('editOnClickHandler', user)
  }

  return (
    <>
      <button
        type="button"
        className="text-primary-600 hover:text-primary-900"
        onClick={() => editOnClickHandler(user)}
      >
        Edit
      </button>
      <span className="sr-only">, {user.full_name}</span>

      {showModal && (
        <EditUserModal
          user={user}
          showModal={showModal}
          onDismiss={() => setShowModal(false)}
          id_token={id_token}
        />
      )}
    </>
  )
}

export default EditOrgUserButton
