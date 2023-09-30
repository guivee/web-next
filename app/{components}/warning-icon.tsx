import ExclamationTriangleIcon from '@heroicons/react/24/solid/ExclamationTriangleIcon'

export const WarningIcon = ({ size = '4' }) => {
  return (
    <ExclamationTriangleIcon
      className={`h-${size} w-${size} text-amber-400 dark:text-rose-300`}
    />
  )
}
