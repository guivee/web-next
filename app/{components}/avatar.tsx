import { getInitials } from '../{lib}/utils'

export default function Avatar({
  full_name,
  size,
}: {
  full_name: string
  size?: number
}) {
  if (!size) size = 12

  const style = `inline-flex h-${size} w-${size} items-center justify-center rounded-full bg-gray-500`

  return (
    <>
      <span className={style}>
        <span className="text-lg font-medium leading-none text-white">
          {getInitials(full_name)}
        </span>
      </span>
    </>
  )
}
