const AuthCommon = (props: any) => {
  return (
    <div className="mx-auto max-w-lg rounded-xl ">
      <div className="mb-8 rounded-t-xl border-b border-neutral-600 border-opacity-20  px-4 py-5 ">
        <h3 className="text-lg font-medium leading-6 text-gray-700">
          {props.title}
        </h3>
        <div className="mt-1 text-sm text-gray-500">{props.desc}</div>
      </div>

      <div className="  px-2 sm:px-10">{props.children}</div>
    </div>
  )
}
export default AuthCommon
