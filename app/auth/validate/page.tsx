import PasswordResetConfirmForm from '../{components}/password-reset-confirm-form'

const ValidatePage = (props: any) => {
  const { email } = props.searchParams
  return <PasswordResetConfirmForm email={email} setToggle={undefined} />
}

export default ValidatePage
