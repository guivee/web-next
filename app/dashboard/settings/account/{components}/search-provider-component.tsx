'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { User } from '../../../../{lib}/acl_types'
import FormPanelComponent from '../../../../{components}/form-panel-component'
import { searchProvider } from '../../../../../src/service/user-service'
import StackedInput from '../../../../{components}/stacked-input'
import { ServerResponse } from '../../../{util}/basic-utils'
import { Provider } from '../../../../{lib}/provider_types'
import { Action } from '../../../{util}/patient_types'

interface SearchProviderComponentProps {
  user: User
  id_token: string
  setProviders: Dispatch<SetStateAction<Provider[]>>
}

const SearchProviderComponent = ({
  user,
  id_token,
  setProviders,
}: SearchProviderComponentProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Provider>()

  const [action, setAction] = useState<Action>({
    notify: { value: false, message: '' },
  })

  const [conflicts, setConflicts] = useState<Provider[]>([])

  const onSubmit: SubmitHandler<Provider> = async (data) => {
    const response: ServerResponse = await searchProvider(
      user.organization_id,
      id_token,
      data
    )

    console.log('response: ', response)

    if (response.statusCode == 404) {
      // no records found
      let provider: Provider = data

      // strip IHI
      provider.hpii_number = undefined
      setProviders([provider])
    } else if (response.statusCode == 200) {
      // records found
      const provider = response.data.search_result
      if (provider === null) {
        setProviders([])
      }

      setProviders([provider])
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

export default SearchProviderComponent

interface BodyProps {
  register: any
}

function Body({ register }: BodyProps) {
  return (
    <div className="space-y-6 divide-y">
      <div className="grid grid-cols-8 gap-6">
        <StackedInput
          label={'Family Name'}
          field={'family_name'}
          register={register}
        />
        <StackedInput
          label={'Given Name'}
          field={'given_name'}
          register={register}
        />
        <StackedInput
          label={'Date Of Birth'}
          field={'date_of_birth'}
          register={register}
        />
        <StackedInput label={'Gender'} field={'sex'} register={register} />
      </div>
      <div className="grid grid-cols-8 gap-6 pt-4">
        <StackedInput
          label={'HPII #'}
          field={'hpii_number'}
          register={register}
        />
      </div>
    </div>
  )
}
