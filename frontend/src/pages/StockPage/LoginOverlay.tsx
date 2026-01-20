import { useState, type Dispatch, type SetStateAction } from "react";
import { NavLink } from "react-router";

type LoginOverlayProps = {
  setShowLogin: Dispatch<SetStateAction<boolean>>
}


export function LoginOverlay({setShowLogin,showLogin,loginTransition, setLoginTransition}: LoginOverlayProps) {
  
  return (
    <>
      {showLogin ? <div className="fixed left-0 right-0 bottom-0 top-0 backdrop-blur-[0px] bg-black/20 w-full h-full z-101"></div>: ''}
      <div className={`fixed top-[0] bottom-0 shadow-xl w-[30vw] right-[-30vw] flex flex-col justify-center items-center p-[15px]  bg-white rounded-l-[8px] gap-12 z-102 transition-all `} style={{transform: `${loginTransition ? 'translateX(-100%)' : 'translateX(100%)'}`}}>
        <button onClick={() => { setShowLogin(false);setLoginTransition(false) }} aria-label="Close" className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="text-[25px] font-semibold w-[25vw] mt-[4vh] text-center">
          Log in frist to start Investing...
        </div>
        <NavLink to='/login' className="w-[70%] button-primary">
          Log in
        </NavLink>

      </div>
    </>
  )
}