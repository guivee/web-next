'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { User } from '../../../../{lib}/acl_types'
import FormPanelComponent from '../../../../{components}/form-panel-component'
import StackedInput from '../../../../{components}/stacked-input'
import { ServerResponse } from '../../../{util}/basic-utils'
import { Action } from '../../../{util}/patient_types'
import { Organization } from '../../../../{lib}/provider_types'
import { searchOrganization } from '../../../../../src/service/user-service'

interface SearchOrganizationComponentProps {
  user: User
  id_token: string
  setOrganizations: Dispatch<SetStateAction<Organization[]>>
}

const SearchOrganizationComponent = ({
  user,
  id_token,
  setOrganizations,
}: SearchOrganizationComponentProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Organization>()

  const [action, setAction] = useState<Action>({
    notify: { value: false, message: '' },
  })

  const [conflicts, setConflicts] = useState<Organization[]>([])

  const onSubmit: SubmitHandler<Organization> = async (data) => {
    const response: ServerResponse = await searchOrganization(
      user.organization_id,
      id_token,
      data
    )

    if (response.statusCode == 404) {
      // no records found
      let organization: Organization = data

      // strip IHI
      organization.hpio_number = undefined
      setOrganizations([organization])
    } else if (response.statusCode == 200) {
      // records found
      const organization = response.data.search_result
      if (organization === null) {
        setOrganizations([])
      }

      setOrganizations([organization])
    } else {
      // error

      handleResponseAlerts(response)
    }
  }

  const handleResponseAlerts = (response: ServerResponse) => {
    const action: Action = response?.data.action
    const conflicting_patients = response?.data.conflicting_patients
    setAction(action)
    setConflicts(conflicting_patients)
  }

  return (
    <>
      <FormPanelComponent
        header={'Account Details'}
        body={<Body register={register} />}
        handleSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
      />
    </>
  )
}

export default SearchOrganizationComponent

interface BodyProps {
  register: any
}

function Body({ register }: BodyProps) {
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="">
          <p>
            To send ePrescriptions, you must input your registration number(s)
            below and link Parchment to your HPOS account. Don’t know how to
            link your account?
          </p>
          <p>
            Confused about terminology/need an HPI-O?
            <a href="https://www.google.com/">Learn more</a>
          </p>
        </div>
        <div className="flex gap-4">
          <span className=" text-gray-500">Parchment CSP #</span>
          <span className="font-bold text-gray-500">859747373722</span>
        </div>
        <div className="grid grid-cols-8 gap-6 pt-4">
          <StackedInput
            label={'HPIO #'}
            field={'hpio_number'}
            register={register}
          />
        </div>
      </div>
    </>
  )
}
