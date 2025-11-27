export function LoginPage() {
  return (
    <div className="login-page-container flex flex-col justify-center items-center bg-sky-200 p-[100px] rounded-[30px]">
      <div className="font-semibold text-start w-full">Login</div>
      <div className="flex gap-[10px]">
        <input className="input-primary" placeholder="First name" />
        <input className="input-primary" placeholder="Last name" />
      </div>
      <input className="input-primary" placeholder="Email" />
      <input className="input-primary" placeholder="Password" />
      <div>
        Is this your first time here? <span className="text-sky-500 underline hover:cursor-pointer hover:text-sky-600">Create account</span>
      </div>
    </div>
  )
}