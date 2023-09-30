import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'

const ErrorMsg = ({ message }: { message: string | undefined }) => {
  //TODO: Add analytics
  return (
    <div className="mt-0.5 inline-flex items-center">
      <ExclamationTriangleIcon className="h-4 w-4 align-middle text-orange-300 dark:text-cyan-300" />
      <span className="ml-1 text-sm font-light text-orange-600 dark:text-cyan-600 ">
        {message}
      </span>
    </div>
  )
}

export default ErrorMsg
