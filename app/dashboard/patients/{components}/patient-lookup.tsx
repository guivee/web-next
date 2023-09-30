'use client'

import { User } from '../../../{lib}/acl_types'
import PatientList from './patient-list'
import { SearchHIIComponent } from './search-hii-component'
import { useState } from 'react'

const PatientLookup = ({
  id_token,
  user,
}: {
  id_token: string
  user: User
}) => {
  const [patients, setPatients] = useState([])

  return (
    <div className="mt-10 mb-5 grid grid-cols-2 gap-5 p-2 sm:mt-0">
      <div className="col-span-2 lg:col-span-2">
        <SearchHIIComponent
          id_token={id_token}
          setPatients={setPatients}
          user={user}
        />
      </div>
      <div className="col-span-2 ">
        <PatientList id_token={id_token} patients={patients} user={user} />
      </div>
    </div>
  )
}

export default PatientLookup
