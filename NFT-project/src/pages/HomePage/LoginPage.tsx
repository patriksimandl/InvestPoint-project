export function LoginPage() {
  return (
    <div className="login-page-container flex flex-col justify-center items-center bg-white shadow-lg p-[100px] rounded-[30px] w-[40%]">
      <div className="font-semibold text-start w-full text-[22px]
      pb-4">Log in to your account</div>
      <div className="flex gap-[10px] w-full">
        <div className="input-container">
          <input className="input-primary" />
          <label className="input-label">First name</label>
        </div>
        <div className="input-container">
          <input className="input-primary" />
          <label className="input-label ">Last name</label>
        </div>
      </div>
      <div className="input-container">
        <input className="input-primary" />
        <label className="input-label">Email</label>
      </div>
      <div className="input-container">
        <input className="input-primary" type="password" />
        <label className="input-label">Password</label>
      </div>
      <button className="button-primary w-full p-2.5 rounded-[8px] mt-[12px]">Log in</button>
      <div className="p-3">
        Is this your first time here? <span className="text-sky-500 underline hover:cursor-pointer hover:text-sky-600">Create account</span>
      </div>
    </div>
  )
}