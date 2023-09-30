'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ErrorBox from './{components}/error-box'
import ProgressBar from './{components}/progress-bar'

export default function RootError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  const router = useRouter()

  const [toggle, setToggle] = useState(false)

  // function to delay the refresh of the page
  function refresh() {
    setTimeout(() => {
      setToggle(!toggle)
    }, 2000)
  }

  function refreshPage() {
    router.refresh()
  }

  useEffect(() => {
    if (!toggle) refreshPage()

    refresh()
  }, [])

  if (!toggle) return <ProgressBar />
  else return <ErrorBox error_msg={error.message} location={'/'} />
}
