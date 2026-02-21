import './MainMenu.css'
import { NavLink } from 'react-router'
import SearchIcon from '../assets/search-icon.svg'
import { AccountMenu } from './AccountMenu';
import { useContext, useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import axios from 'axios';
import { IsLoggedContext, UserEmailContext } from '../App';

export function MainMenu() {
  const { isLogged, setIsLogged } = useContext(IsLoggedContext)!;
  const { userEmail } = useContext(UserEmailContext)!;
  const mainMenu = useRef(null);
  const menuLinks = ['Portfolio', 'Stocks'];

  const [isAtTop, setIsAtTop] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);




  useEffect(() => {

    async function menuTransition () {
      if (!mainMenu.current) return

      if (window.scrollY <= 30) {
        
        await setIsAtTop(true);
        mainMenu.current.classList.add('transition-all');
      }
      else {
        mainMenu.current.classList.add('transition-all');
      }


      

      const onScroll = () => { setIsAtTop(window.scrollY <= 30)}

      window.addEventListener('scroll', () => { onScroll() });
      return () => window.removeEventListener('scroll', () => { onScroll() })
    }

    menuTransition();

  }, [mainMenu])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);




  const winUrl = window.location.pathname;


  return (
    <>
      <div className="fixed top-0 inset-x-0 z-100">
        <div
          ref={mainMenu}
          className={`flex flex-row justify-between  h-[68px] md:h-[84px] items-center shadow-2xl transition-all duration-100 ${isAtTop ? 'bg-white rounded-[40px] md:rounded-[56px] w-[calc(100%-40px)] sm:w-[calc(100%-40px)]  mx-auto  my-4 md:my-6 max-w-7xl ' : 'w-full bg-white'}`}
          style={winUrl === '/' ? {} : { top: isAtTop ? '' : '0px', left: isAtTop ? '' : '0px', borderRadius: isAtTop ? '' : '0px', right: isAtTop ? '' : '0px', height: isAtTop ? '' : '100px' }}
        >
          <div className={`flex flex-row justify-between w-full items-center ${isAtTop ? '' : 'max-w-7xl mx-auto px-[20px] sm:px-[20px]'} px-[14px] md:px-[22px]`}>
            <div className="main-menu-left-container flex items-center gap-[14px] md:gap-[40px]">
              <NavLink to='/'>
                <img className={`w-[32vw] max-w-[170px] md:w-[10vw] c-sky-200`} src="/InvestPoint-logo-with-blacktext-removebg-preview.png" alt="Invest-point-logo" />
              </NavLink>
              <div className="hidden md:flex items-center gap-[40px]">
                {menuLinks.map((item) => {
                  return (
                    <NavLink key={item} className='main-menu-link' to={`/${item.toLowerCase()}`}>
                      {item}
                    </NavLink>
                  )
                })}
              </div>
            </div>
            <div className="main-menu-right-container hidden md:flex items-center gap-[30px]">
              <div className="search-bar-container flex relative">
                <input className="rounded-[30px] p-[8px] h-[49.5px] pl-[22px] bg-gray-100 outline-none text-[14.5px]" placeholder='Search for Stock' />
                <img src={SearchIcon} className='w-7 absolute search-icon cursor-pointer'></img>
              </div>
              {isLogged ?
                <AccountMenu />
                :
                <NavLink className='button-primary' to={'/login'}>
                  Log in
                </NavLink>
              }
            </div>
            <div className="md:hidden flex items-center">
              <button
                type="button"
                className="p-2 rounded-[10px] hover:bg-slate-100"
                aria-label="Toggle menu"
                onClick={() => setIsMobileOpen((prev) => !prev)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#111827">
                  <path d="M120-240v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div
          className={`md:hidden fixed inset-0 bg-black/25 z-100 transition-opacity duration-300 ${isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsMobileOpen(false)}
        ></div>
      <div
        className={`md:hidden fixed top-0 right-0 bottom-0 w-[78vw] max-w-[320px] bg-white shadow-2xl p-5 z-101 transform transition-transform duration-300 flex flex-col ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between mb-5">
          <NavLink to='/' onClick={() => setIsMobileOpen(false)}>
            <img className='w-[140px]' src="/InvestPoint-logo-with-blacktext-removebg-preview.png" alt="Invest-point-logo" />
          </NavLink>
          <button
            type="button"
            className="p-2 rounded-[10px] hover:bg-slate-100"
            aria-label="Close menu"
            onClick={() => setIsMobileOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#111827">
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
        </div>
        <div className="text-[12px] uppercase tracking-[0.18em] text-slate-500 mb-2">Search</div>
        <div className="search-bar-container flex relative mb-5">
          <input className="rounded-[14px] p-[10px] h-[44px] pl-[16px] bg-gray-100 outline-none text-[14px] w-full" placeholder='Search for Stock' />
          <img src={SearchIcon} className='w-6 absolute search-icon cursor-pointer'></img>
        </div>
        <div className="text-[12px] uppercase tracking-[0.18em] text-slate-500 mb-2">Navigation</div>
        <div className="flex flex-col gap-2">
          <NavLink className='main-menu-link py-2 px-3 rounded-[10px] hover:bg-slate-100' to='/' onClick={() => setIsMobileOpen(false)}>
            Home
          </NavLink>
          {menuLinks.map((item) => {
            return (
              <NavLink key={item} className='main-menu-link py-2 px-3 rounded-[10px] hover:bg-slate-100' to={`/${item.toLowerCase()}`} onClick={() => setIsMobileOpen(false)}>
                {item}
              </NavLink>
            )
          })}
        </div>
        <div className="mt-auto pt-5 border-t border-slate-200">
          <div className="text-[12px] uppercase tracking-[0.18em] text-slate-500 mb-3 mt-4">Account</div>
          {isLogged ? (
            <div className="flex flex-col gap-2">
              {userEmail && (
                <div className="flex items-center gap-2 p-3 rounded-[10px] bg-slate-50 border border-slate-200">
                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000" className="flex-shrink-0">
                    <path d="M240.92-268.31q51-37.84 111.12-59.77Q412.15-350 480-350t127.96 21.92q60.12 21.93 111.12 59.77 37.3-41 59.11-94.92Q800-417.15 800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 62.85 21.81 116.77 21.81 53.92 59.11 94.92ZM480.01-450q-54.78 0-92.39-37.6Q350-525.21 350-579.99t37.6-92.39Q425.21-710 479.99-710t92.39 37.6Q610-634.79 610-580.01t-37.6 92.39Q534.79-450 480.01-450ZM480-100q-79.15 0-148.5-29.77t-120.65-81.08q-51.31-51.3-81.08-120.65Q100-400.85 100-480t29.77-148.5q29.77-69.35 81.08-120.65 51.3-51.31 120.65-81.08Q400.85-860 480-860t148.5 29.77q69.35 29.77 120.65 81.08 51.31 51.3 81.08 120.65Q860-559.15 860-480t-29.77 148.5q-29.77 69.35-81.08 120.65-51.3 51.31-120.65 81.08Q559.15-100 480-100Zm0-60q54.15 0 104.42-17.42 50.27-17.43 89.27-48.73-39-30.16-88.11-47Q536.46-290 480-290t-105.77 16.65q-49.31 16.66-87.92 47.2 39 31.3 89.27 48.73Q425.85-160 480-160Zm0-350q29.85 0 49.92-20.08Q550-550.15 550-580t-20.08-49.92Q509.85-650 480-650t-49.92 20.08Q410-609.85 410-580t20.08 49.92Q450.15-510 480-510Zm0-70Zm0 355Z" />
                  </svg>
                  <div className="text-sm font-medium truncate">{userEmail}</div>
                </div>
              )}
              <button
                onClick={() => {
                  const logOut = async () => {
                    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {}, { withCredentials: true });
                    if (response.status) {
                      setIsLogged(false);
                      setIsMobileOpen(false);
                    }
                  };
                  logOut();
                }}
                className="flex items-center gap-2 p-3 rounded-[10px] hover:bg-slate-100 text-sm font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000" className="flex-shrink-0">
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                </svg>
                <span>Log out</span>
              </button>
            </div>
          ) : (
            <NavLink className="button-primary !px-4 !py-3 !text-[14px] !w-full justify-center" to="/login" onClick={() => setIsMobileOpen(false)}>
              Log in
            </NavLink>
          )}
        </div>
      </div>        </div>
          {/*winUrl === '/' ? '' :
        <div className="w-full  bg-slate-100 fixed top-[0px] h-[100px] content-end px-[8%] z-98 text-white pb-[10px]">
          {winUrl === '/stocks' ?
            <div className={`grid grid-cols-3   font-semibold ${isLogged ? 'w-[69%]' : `w-full`}`}>
              <div className="ml-[90px]">Share</div>
              <div className="ml-[98px]">Price</div>
              <div></div>
            </div> : ''
          }
          {winUrl === '/portfolio' ?
            <div className='ml-[20px] text-[17px] font-semibold '>Portfolio overview</div> : ''
          }

        </div>
        */
        ''
      }
      
    </>

  )
}