'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { ACCOUNT_LOOKUP_LINK } from '../../../../{lib}/links'
import { getInitials } from '../../../../{lib}/utils'
import FormPanelComponent from '../../../../{components}/form-panel-component'
import StackedLabel from '../../../../{components}/stacked-label'
import { Provider } from '../../../../{lib}/provider_types'

interface AccountReadonlyFormProps {
  provider: Provider
}

const ProviderGrid = ({ provider }: AccountReadonlyFormProps) => {
  const router = useRouter()
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Provider>()

  const handleMoveEdit = () => {
    router.push(ACCOUNT_LOOKUP_LINK)
  }
  return (
    <>
      <FormPanelComponent
        header="Profile"
        body={
          <Body
            handleSubmit={handleSubmit}
            onMoveEdit={handleMoveEdit}
            provider={provider}
          />
        }
        footer={{ idle: 'Update', submitting: '' }}
        handleSubmit={handleSubmit(handleMoveEdit)}
        isSubmitting={isSubmitting}
      />
    </>
  )
}

export default ProviderGrid

interface BodyProps {
  handleSubmit: any
  onMoveEdit: () => void
  provider: Provider
}

function Body({ handleSubmit, onMoveEdit, provider }: BodyProps) {
  const fullName = [provider.given_name, provider.family_name].join(' ')
  const abbreviatedName = getInitials(fullName)

  return (
    <>
      <div className="flex items-center gap-4 text-black">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300 align-middle text-xl">
          {abbreviatedName}
        </div>
        <div className="text-3xl ">{fullName}</div>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-3"></div>
    </>
  )
}
