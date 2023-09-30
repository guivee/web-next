export type radioItemType = {
  id: string
  value: string
  display: string
}
export default function RadioComponent({
  itemList,
  name,
}: {
  itemList: radioItemType[]
  name: string
}) {
  return (
    <div>
      <fieldset className="">
        <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
          {itemList.map((item) => (
            <div key={item.id} className="flex items-center">
              <input
                id={item.id}
                name={name}
                type="radio"
                defaultChecked={item.id === '0'}
                className="h-4 w-4 border-gray-300 text-primary-400 focus:ring-primary-100"
              />
              <label
                htmlFor={item.display}
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                {item.display}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  )
}
