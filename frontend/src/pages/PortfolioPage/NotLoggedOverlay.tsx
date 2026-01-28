import { NavLink } from "react-router"

export function NotLoggedOverlay() {
  return (
    <>
      <div className="fixed left-0 right-0 bottom-0 top-0 backdrop-blur-[10px] bg-black/20 w-full h-full z-11"></div>
      <div className="fixed top-[50%] w-[30vw] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col  items-center p-[15px] h-[280px] bg-white rounded-[8px] gap-12 z-11">
        <div className="text-[25px] font-semibold w-[25vw] mt-[4vh] text-center">
          You need to be logged in to view your portfolio.
        </div>
        <NavLink to='/login' className="w-[70%] button-primary">
          Log in
        </NavLink>

      </div>
    </>
  )
}