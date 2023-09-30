import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'

export default function ErrorBox({
  error_msg,
  location,
}: {
  error_msg: string
  location: string
}) {
  return (
    <div className="mx-auto mt-20 max-w-lg rounded-md border border-yellow-200 bg-yellow-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon
            className="h-5 w-5 text-yellow-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">Oops...</h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>{error_msg}.</p>
          </div>
        </div>
        <div>{location}</div>
      </div>
    </div>
  )
}
