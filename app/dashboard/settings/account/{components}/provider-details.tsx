import Link from 'next/link'
import FormPanelComponent from '../../../../{components}/form-panel-component'
import StackedLabel from '../../../../{components}/stacked-label'
import { Provider } from '../../../../{lib}/provider_types'
import LinkButton from '../../../../{components}/link-button'
import { ACCOUNT_EDIT_LINK } from '../../../../{lib}/links'

const ProviderDetails = ({ provider }: { provider: Provider }) => {
  return (
    <>
      <FormPanelComponent
        header={'Provider Details'}
        body={<Body provider={provider} />}
        handleSubmit={undefined}
        customSubmit={<LinkButton label="Update" link={ACCOUNT_EDIT_LINK} />}
        isSubmitting={false}
        footer={{ idle: 'Update', submitting: 'Update' }}
      />
    </>
  )
}

const Body = ({ provider }: { provider: Provider }) => {
  return (
    <div>
      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-8">
        <StackedLabel label="Family Name" value={provider.family_name} />
        <StackedLabel label="Given Name" value={provider.given_name} />
        <StackedLabel label="Date Of Birth" value={provider.date_of_birth} />
        <StackedLabel label="Gender" value={provider.sex} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-8">
        <StackedLabel label="HPII #" value={provider.hpii_number} />
      </div>
    </div>
  )
}

export default ProviderDetails
