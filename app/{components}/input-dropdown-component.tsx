export type InputdropdownItemType = {
  id: number
  value: string
  display: string
}
export const InputDropdownComponent = ({
  itemList,
  placeholder,
}: {
  itemList: InputdropdownItemType[]
  placeholder?: string
}) => {
  return (
    <div className="relative rounded-md ">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <span className="text-gray-500 sm:text-sm"></span>
      </div>
      <input
        type="text"
        name="price"
        id="price"
        className="block w-full rounded-md border border-gray-300  pl-3 pr-24 placeholder:italic placeholder:text-slate-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 sm:text-sm"
        placeholder={placeholder}
      />
      <div className="absolute inset-y-0 right-0 flex items-center">
        <label htmlFor="currency" className="sr-only">
          Currency
        </label>
        <select
          id="currency"
          name="currency"
          className="h-full rounded-r-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 sm:text-sm"
        >
          {itemList.map((item) => (
            <option key={item.id.toString()}>{item.display}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default InputDropdownComponent
