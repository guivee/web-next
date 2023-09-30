import { PlusIcon } from '@heroicons/react/24/solid'

const PlusBtn = ({ onClickHandler }: { onClickHandler: () => void }) => {
  return (
    <button
      type="button"
      className="flex items-center justify-center rounded-full bg-primary-600 p-1 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      onClick={onClickHandler}
    >
      <PlusIcon className="h-6 w-6 p-1" aria-hidden="true" />
      <span className="sr-only">Add file</span>
    </button>
  )
}

export default PlusBtn
