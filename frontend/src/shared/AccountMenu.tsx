import { useState, useRef, useEffect, useContext } from 'react'
import { } from 'react';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { IsLoggedContext, UserEmailContext } from '../App';





export function AccountMenu() {
  const { setIsLogged } = useContext(IsLoggedContext)!;
  const { userEmail } = useContext(UserEmailContext)!;
  const [menuActive, setMenuActive] = useState(false);

  const toggleButton = useRef(null);
  const accountMenu = useRef(null);


  const queryClient = useQueryClient();



  useEffect(() => {
    function handleClick(event: MouseEvent) {

      if (menuActive && accountMenu.current && !accountMenu.current.contains(event.target) && toggleButton.current && !toggleButton.current.contains(event.target)) {
        setMenuActive(false);
      }
    }

    document.addEventListener('mousedown', handleClick);
    return () => { document.removeEventListener('mousedown', handleClick) }


  }, [menuActive]);


  async function logOut() {
    // const response = await axios.post('http://localhost:3000/auth/logout', {}, { withCredentials: true })
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {}, { withCredentials: true })

    if (response.status) {
      setIsLogged(false);
      queryClient.setQueryData(["verification"], () => false)
    }


  }





  return (
    <div className='relative'  >
      {/*<img className="cursor-pointer h-[40px] " src={AccountIcon} ref={toggleButton} onClick={() => { setMenuActive(!menuActive) }} />*/}
      <div className='cursor-pointer h-[36px] md:h-[50px]' onClick={() => { setMenuActive(!menuActive) }} ref={toggleButton}>
        <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#000000" className="md:h-[45px] md:w-[45px]"><path d="M240.92-268.31q51-37.84 111.12-59.77Q412.15-350 480-350t127.96 21.92q60.12 21.93 111.12 59.77 37.3-41 59.11-94.92Q800-417.15 800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 62.85 21.81 116.77 21.81 53.92 59.11 94.92ZM480.01-450q-54.78 0-92.39-37.6Q350-525.21 350-579.99t37.6-92.39Q425.21-710 479.99-710t92.39 37.6Q610-634.79 610-580.01t-37.6 92.39Q534.79-450 480.01-450ZM480-100q-79.15 0-148.5-29.77t-120.65-81.08q-51.31-51.3-81.08-120.65Q100-400.85 100-480t29.77-148.5q29.77-69.35 81.08-120.65 51.3-51.31 120.65-81.08Q400.85-860 480-860t148.5 29.77q69.35 29.77 120.65 81.08 51.31 51.3 81.08 120.65Q860-559.15 860-480t-29.77 148.5q-29.77 69.35-81.08 120.65-51.3 51.31-120.65 81.08Q559.15-100 480-100Zm0-60q54.15 0 104.42-17.42 50.27-17.43 89.27-48.73-39-30.16-88.11-47Q536.46-290 480-290t-105.77 16.65q-49.31 16.66-87.92 47.2 39 31.3 89.27 48.73Q425.85-160 480-160Zm0-350q29.85 0 49.92-20.08Q550-550.15 550-580t-20.08-49.92Q509.85-650 480-650t-49.92 20.08Q410-609.85 410-580t20.08 49.92Q450.15-510 480-510Zm0-70Zm0 355Z"/></svg>
      </div>
      <div ref={accountMenu} className={`rounded-[10px] absolute bg-white shadow-xl w-[75vw] sm:w-[55vw] md:w-[18vw] min-w-[200px] max-w-[280px] top-12 md:top-14 right-0 z-100 flex-col border border-slate-200 ${menuActive ? 'flex' : 'hidden'}`} >
        {userEmail ?
          <div className="hover:bg-slate-100 w-full rounded-t-[10px] p-3 md:p-[14px] cursor-pointer flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000" className="md:h-[24px] md:w-[24px] flex-shrink-0"><path d="M240.92-268.31q51-37.84 111.12-59.77Q412.15-350 480-350t127.96 21.92q60.12 21.93 111.12 59.77 37.3-41 59.11-94.92Q800-417.15 800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 62.85 21.81 116.77 21.81 53.92 59.11 94.92ZM480.01-450q-54.78 0-92.39-37.6Q350-525.21 350-579.99t37.6-92.39Q425.21-710 479.99-710t92.39 37.6Q610-634.79 610-580.01t-37.6 92.39Q534.79-450 480.01-450ZM480-100q-79.15 0-148.5-29.77t-120.65-81.08q-51.31-51.3-81.08-120.65Q100-400.85 100-480t29.77-148.5q29.77-69.35 81.08-120.65 51.3-51.31 120.65-81.08Q400.85-860 480-860t148.5 29.77q69.35 29.77 120.65 81.08 51.31 51.3 81.08 120.65Q860-559.15 860-480t-29.77 148.5q-29.77 69.35-81.08 120.65-51.3 51.31-120.65 81.08Q559.15-100 480-100Zm0-60q54.15 0 104.42-17.42 50.27-17.43 89.27-48.73-39-30.16-88.11-47Q536.46-290 480-290t-105.77 16.65q-49.31 16.66-87.92 47.2 39 31.3 89.27 48.73Q425.85-160 480-160Zm0-350q29.85 0 49.92-20.08Q550-550.15 550-580t-20.08-49.92Q509.85-650 480-650t-49.92 20.08Q410-609.85 410-580t20.08 49.92Q450.15-510 480-510Zm0-70Zm0 355Z"/></svg>
            <div className='ml-2 md:ml-[10px] text-nowrap text-sm md:text-base truncate'>{userEmail}</div>
          </div> : ''}
        <div className="hover:bg-slate-100 w-full rounded-b-[10px] p-3 md:p-[14px] cursor-pointer flex items-center" onClick={logOut}>
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000" className="md:h-[24px] md:w-[24px] flex-shrink-0"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" /></svg>
          <div className='ml-2 md:ml-[10px] text-nowrap text-sm md:text-base'>Log out</div>
        </div>
      </div>
    </div>
  )
}