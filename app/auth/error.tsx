'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import ErrorBox from '../{components}/error-box'
import { USER_DETAILS_FETCH_FAILED } from '../{lib}/constants'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    // Log the error to an error reporting service
    if (String(error.message) == USER_DETAILS_FETCH_FAILED) {
      //redirect
      // router.push(SIGNIN_LINK)
    }
  }, [error])

  return (
    <>
      <ErrorBox error_msg={error.message} location={'/auth'} />
    </>
  )
}
