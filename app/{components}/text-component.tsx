export default function TextComponent({
  name,
  placeholder,
  type,
  value,
}: {
  name: string
  placeholder?: string
  type?: string
  value?: string
}) {
  return (
    <input
      name={name}
      type={type}
      id={name}
      className="br-input"
      placeholder={placeholder}
      value={value}
    />
  )
}
