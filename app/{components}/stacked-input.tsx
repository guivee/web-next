function StackedInput({
  label,
  field,
  register,
}: {
  label: string
  field: string
  register: any
}) {
  return (
    <div className="col-span-8 sm:col-span-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input {...register(field)} className="br-input" />
    </div>
  )
}

export default StackedInput
