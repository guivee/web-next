export const configFunc = () => {
  return {
    aws_project_region: process.env.NEXT_PUBLIC_AWS_REGION,
    aws_cognito_identity_pool_id:
      process.env.NEXT_PUBLIC_AWS_COGNITO_IDENTITY_POOL_ID,
    aws_cognito_region: process.env.NEXT_PUBLIC_AWS_REGION,
    aws_user_pools_id: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID,
    aws_user_pools_web_client_id:
      process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_WEB_CLIENT_ID,
    // aws_user_pools_web_client_secret:
    //   process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_WEB_CLIENT_SECRET,  // Doesnt work with Amplify
    oauth: {},
    aws_cognito_username_attributes: ['EMAIL'],
    aws_cognito_social_providers: [],
    aws_cognito_signup_attributes: ['EMAIL'],
    aws_cognito_mfa_configuration: 'OFF',
    aws_cognito_mfa_types: ['TOTP'],
    aws_cognito_password_protection_settings: {
      passwordPolicyMinLength: 8,
      passwordPolicyCharacters: [],
    },
    aws_cognito_verification_mechanisms: ['EMAIL'],
  }
}

export default configFunc
