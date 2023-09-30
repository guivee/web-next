export default function StatusBadge({
  status,
}: {
  status: string | undefined
}) {
  if (status === undefined) {
    return null
  }

  let badgeColorClasses
  const lowerCaseStatus = status.toLowerCase()
  const upperCaseStatus = status.toUpperCase()
  if (lowerCaseStatus === 'active' || lowerCaseStatus === 'verified') {
    badgeColorClasses = 'border-green-200 text-green-600'
  } else {
    badgeColorClasses = 'border-yellow-200 text-yellow-600'
  }

  return (
    <p className={`br-badge ml-2 bg-gray-100 text-xs ${badgeColorClasses}`}>
      {upperCaseStatus}
    </p>
  )
}
