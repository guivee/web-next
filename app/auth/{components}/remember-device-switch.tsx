import { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'

// @ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function RememberDeviceSwitch({
  onChange,
  value,
}: {
  onChange: any
  value: boolean
}) {
  const [enabled, setEnabled] = useState(value)

  useEffect(() => {
    onChange(enabled)
  }, [enabled])

  return (
    <div className="rounded-lg border  bg-gray-100 bg-opacity-50 p-3">
      <Switch.Group as="div" className="flex items-center justify-between ">
        <span className="flex flex-grow flex-col">
          <Switch.Label
            as="span"
            className="text-sm font-medium text-gray-700"
            passive
          >
            Do you trust this machine?
          </Switch.Label>
          <Switch.Description as="span" className="pt-1 text-xs text-gray-500">
            If yes, flip the switch and we wont ask you for your MFA token
            everytime you login.
          </Switch.Description>
        </span>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={classNames(
            enabled ? 'bg-secondary-200' : 'bg-gray-200',
            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:ring-offset-2'
          )}
        >
          <span
            aria-hidden="true"
            className={classNames(
              enabled ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
            )}
          />
        </Switch>
      </Switch.Group>
    </div>
  )
}
