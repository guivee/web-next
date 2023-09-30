import BrButton from './pm-button'

export default function FormPanelComponent({
  header,
  body,
  footer = { idle: 'Submit', submitting: 'Submitting' },
  handleSubmit,
  isSubmitting,
  customSubmit,
}: {
  header: string
  body: any
  footer?: { idle: string; submitting: string }
  handleSubmit: any
  isSubmitting: boolean
  customSubmit?: any
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-100 bg-white">
      <div className="px-4 py-5 text-xl  font-semibold text-gray-500 sm:px-6">
        {header}
        {/* We use less vertical padding on card headers on desktop than on body sections */}
      </div>
      <div className=" divide-gray-200 ">
        <form onSubmit={handleSubmit} className="divide-y">
          <div className="px-4  text-gray-500 sm:px-6 sm:pb-3">{body}</div>
          <div className="flex justify-end px-4 py-4 sm:px-3">
            <div className=" justify-end">
              {!customSubmit && (
                <BrButton
                  isSubmitting={isSubmitting}
                  type="submit"
                  name={isSubmitting ? footer.submitting : footer.idle}
                  isActive={true}
                  testIdPrefix="submit"
                />
              )}
              {customSubmit}
            </div>
            {/* We use less vertical padding on card footers at all sizes than on headers or body sections */}
          </div>
        </form>
      </div>
    </div>
  )
}
