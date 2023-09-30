import FormPanelComponent from '../../../../{components}/form-panel-component'
import StackedLabel from '../../../../{components}/stacked-label'
import LinkButton from '../../../../{components}/link-button'
import { Organization } from '../../../../{lib}/provider_types'
import { ORGANIZATION_EDIT_LINK } from '../../../../{lib}/links'

const OrganizationDetails = ({
  organization,
}: {
  organization: Organization
}) => {
  return (
    <>
      <FormPanelComponent
        header={'Organization Details'}
        body={<Body organization={organization} />}
        handleSubmit={undefined}
        customSubmit={<LinkButton label="Edit" link={ORGANIZATION_EDIT_LINK} />}
        isSubmitting={false}
        footer={{ idle: 'Update', submitting: 'Update' }}
      />
    </>
  )
}

const Body = ({ organization }: { organization: Organization }) => {
  return (
    <div>
      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-8">
        <StackedLabel label="HPIO #" value={organization.hpio_number} />
      </div>
    </div>
  )
}

export default OrganizationDetails
