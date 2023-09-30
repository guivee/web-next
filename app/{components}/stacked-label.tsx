import StatusBadge from './status-badge'

const StackedLabel = ({
  label,
  value,
  badge,
}: {
  label: string
  value: string | undefined
  badge?: string
}) => {
  return (
    <>
      <div className="col-span-1 sm:col-span-2">
        <div className="flex-col">
          <dt className="text-sm  font-bold text-gray-600">{label}</dt>
          <div className="flex-col items-center">
            <dd className="text-md   text-gray-600">{value}</dd>
            {/* <StatusBadge status={badge} /> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default StackedLabel
