'use client'
import Link from 'next/link'

export default function StripeCustomerPortal({
  url,
  email,
}: {
  url: string
  email: string
}) {
  return (
    <>
      <div className=" rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Manage subscription
          </h3>
          <div className="mt-2 sm:flex sm:items-start sm:justify-between">
            <div className="max-w-xl text-sm text-gray-500">
              <p>
                You can manage your subscription and billing information
                directly from Stripe.
              </p>
            </div>
            <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex sm:flex-shrink-0 sm:items-center">
              <Link
                href={`${url}?prefilled_email=${email}`}
                className="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:text-sm"
              >
                Update billing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
