const AuthLayout = (props: { children: React.ReactNode }) => {
  const { children } = props

  return (
    <div className="h-screen  min-h-full overflow-y-auto bg-white bg-gradient-to-tr  from-white to-slate-100 px-4 sm:px-6 md:grid   md:place-items-center  lg:px-8">
      {children}
    </div>
  )
}

export default AuthLayout
