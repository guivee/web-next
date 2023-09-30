var classNames = require('classnames')
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { WarningIcon } from './warning-icon'
// import { generateTestSelector } from "../lib/utils";

type AppProps = {
  name: string
  isPrimary?: boolean
  isDelete?: boolean
  isValid?: boolean
  isActive?: boolean
  isExternalLink?: boolean
  type?: 'submit' | 'reset' | 'button'
  isSubmitting?: boolean
  onClick?: any
  testIdPrefix: string
}

const ExternalLinkIcon = () => {
  return (
    <div className="ml-2 h-5 w-5 text-rose-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.25}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </div>
  )
}

const DeleteIcon = () => {
  return (
    <div className="ml-2 h-5 w-5 text-rose-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.25}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </div>
  )
}

export default function BrButton({
  name,
  isPrimary = true,
  isDelete = false,
  isValid = true,
  isActive = true,
  isExternalLink = false,
  type = 'button',
  isSubmitting = false,
  testIdPrefix,
  ...props
}: AppProps) {
  const brStyle = classNames(
    {
      'disabled:opacity-50 text-primary-800  dark:text-rose-300 bg-primary-400 dark:bg-rose-900':
        isPrimary,
    },
    {
      'hover:bg-primary-500 dark:hover:bg-rose-800 focus:ring-primary-500':
        isActive && isPrimary,
    },
    {
      'disabled:opacity-50 text-rose-500  border border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-800 ':
        !isPrimary,
    },
    {
      'hover:bg-rose-100 hover:border-rose-100 focus:ring-rose-100 dark:hover:bg-transparent dark:hover:border-rose-700 dark:hover:text-rose-700 dark:focus:ring-rose-700 ':
        isActive && !isPrimary,
    },
    ' w-full h-10 p-2  text-sm   font-medium rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-offset-1  items-center justify-right '
  )

  return (
    <button
      disabled={isSubmitting || !isActive}
      onClick={props.onClick}
      type={type}
      className={brStyle}
      // data-cy={`${testIdPrefix}-${generateTestSelector(name)}`}
    >
      <div className="inline-flex items-center">
        <div className="whitespace-nowrap">{name.toUpperCase()}</div>
        {isDelete && <DeleteIcon />}
        {!isValid && <WarningIcon />}
        {isExternalLink && <ExternalLinkIcon />}
      </div>
    </button>
  )
}
