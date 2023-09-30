'use client'

import { SIGNIN_LINK } from '../../{lib}/links'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ProgressBar from '../../{components}/progress-bar'

export default function Unauthenticated() {
  const router = useRouter()
  const [toggle, setToggle] = useState(false)

  // function to delay the refresh of the page
  function refresh() {
    setTimeout(() => {
      setToggle(!toggle)
    }, 2000)
  }

  function refreshPage() {
    console.log('refreshing page...')
    router.refresh()
  }

  // router.refresh()

  useEffect(() => {
    if (!toggle) refreshPage()

    refresh()
  }, [])

  if (!toggle) return <ProgressBar />
  else return <UnauthorizedComponent />
}

function UnauthorizedComponent() {
  return (
    <div className="">
      <div className="mx-auto max-w-max">
        <main className="sm:flex">
          <p className="text-4xl font-bold tracking-tight text-primary-600 sm:text-5xl">
            401
          </p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Restricted Access
              </h1>
              <p className="mt-1 text-base text-gray-500">
                Please use the login page to gain access.
              </p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <a
                href={SIGNIN_LINK}
                className="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Login
              </a>
              <a
                href="#"
                className="inline-flex items-center rounded-md border border-transparent bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Contact support
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
