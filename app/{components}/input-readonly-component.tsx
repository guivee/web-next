export type InputReadonlyItemType = {
  id: number
  value: string
  display: string
}
export const InputReadonlyComponent = ({
  readonlyText,
  placeholder,
  name,
}: {
  readonlyText: string
  placeholder?: string
  name: string
}) => {
  return (
    <div className="br-input relative flex items-center justify-end overflow-hidden rounded-md p-0 focus-within:border-primary-500  focus-within:ring-1   focus-within:ring-primary-500 focus:border-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 ">
        <span className="text-gray-500 sm:text-sm"></span>
      </div>
      <input
        type="number"
        name={name}
        id={`${name}-input-readony`}
        className="block w-full border-0   placeholder:italic placeholder:text-slate-400 focus:ring-0 sm:text-sm"
        placeholder={placeholder}
      />
      <div className="flex items-center">
        <label className="flex w-full whitespace-nowrap px-2  text-gray-500 sm:text-sm">
          {readonlyText}
        </label>
      </div>
    </div>
  )
}

export default InputReadonlyComponent
