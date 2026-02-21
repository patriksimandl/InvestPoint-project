import { NavLink } from "react-router"

export function NotLoggedOverlay() {
  return (
    <>
      <div className="fixed inset-0 backdrop-blur-sm bg-slate-950/35 z-11"></div>
      <div className="fixed top-1/2 left-1/2 w-[90vw] sm:w-[70vw] md:w-[42vw] lg:w-[32vw] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center px-6 py-7 sm:px-8 sm:py-8 bg-white/90 ring-1 ring-black/5 rounded-2xl shadow-[0_28px_90px_-45px_rgba(0,0,0,0.55)] gap-6 z-11">
        <div className="text-[11px] uppercase tracking-[0.32em] text-slate-500">Portfolio access</div>
        <div className="text-[21px] sm:text-[24px] font-semibold w-full max-w-[520px] text-center text-slate-900">
          You need to be logged in to view your portfolio.
        </div>
        <NavLink to='/login' className="w-full max-w-[320px] button-primary">
          Log in
        </NavLink>

      </div>
    </>
  )
}