import ConfirmForm from '../{components}/confirm-form'
import AuthCommon from '../{components}/auth-common'

const ConfirmPage = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) => {
  const title = 'Verify Email'
  const email: string = String(searchParams?.email)

  const description = 'Please check your email for verification code'
  const DescriptionComponent = () => <div>{description}</div>
  return (
    <AuthCommon title={title} desc={<DescriptionComponent />}>
      <ConfirmForm email={email} />
    </AuthCommon>
  )
}
export default ConfirmPage
