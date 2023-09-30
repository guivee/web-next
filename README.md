# web-ui

Web UI for Parchment

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Stripe testing cards at https://stripe.com/docs/testing

Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) with your browser to see the result.

# Pages

```
┌ ○ /
├ λ /auth/confirm
├ ○ /auth/login
├ ○ /auth/mfa
├ ○ /auth/reset
├ ○ /auth/setup-mfa
├ ○ /auth/signup
├ ○ /auth/unauthorised
├ λ /auth/validate
├ λ /dashboard
├ λ /dashboard/patients
├ λ /dashboard/patients/[patient_id]
├ λ /dashboard/patients/[patient_id]/prescriptions
├ λ /dashboard/patients/[patient_id]/prescriptions/[prescription_id]
├ λ /dashboard/patients/lookup
├ λ /dashboard/settings
├ λ /dashboard/settings/account
├ λ /dashboard/settings/billing
├ λ /dashboard/settings/organization
├ λ /dashboard/settings/users
```
