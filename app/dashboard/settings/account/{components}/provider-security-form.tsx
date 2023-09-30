'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { User } from '../../../../{lib}/acl_types'
import FormPanelComponent from '../../../../{components}/form-panel-component'
import { Organization } from '../../../../{lib}/provider_types'

interface ProviderSecurityFormProps {
  user: User
  id_token: string
}

const ProviderSecurityForm = ({
  user,
  id_token,
}: ProviderSecurityFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Organization>()

  const onSubmit: SubmitHandler<Organization> = async () => {
    //TBD
    console.log('ProviderSecurityForm is submitted with token: ', id_token)
  }

  return (
    <>
      <FormPanelComponent
        header={'Change Password'}
        footer={{ idle: 'Send Email', submitting: 'Sending Email' }}
        body={<Body />}
        handleSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
      />
    </>
  )
}

export default ProviderSecurityForm

function Body() {
  return (
    <div>
      Click on the button below to send yourself email with instructions to
      reset your password.
    </div>
  )
}
