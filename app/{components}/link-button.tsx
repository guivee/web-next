import Link from 'next/link'

const LinkButton = ({ link, label }: { link: string; label: String }) => {
  return (
    <Link
      className=" rounded-md bg-primary-300 px-4 py-2 text-sm text-primary-800 hover:bg-primary-400"
      href={link}
    >
      {label.toUpperCase()}
    </Link>
  )
}

export default LinkButton
