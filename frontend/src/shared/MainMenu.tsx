import './MainMenu.css'
import { NavLink } from 'react-router'
import SearchIcon from '../assets/search-icon.svg'
import { AccountMenu } from './AccountMenu';
import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';

export type MainMenuProps = {
  setIsLogged: Dispatch<SetStateAction<boolean>>;
  isLogged: boolean
  userEmail?: string | undefined
}

export function MainMenu({ isLogged, setIsLogged, userEmail }: MainMenuProps) {
  const mainMenu = useRef(null);
  const menuLinks = ['Portfolio', 'Stocks'];

  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(()=>{
    console.log('isAtTop');
    console.log(isAtTop);
  },[isAtTop])



  useEffect(() => {

    async function menuTransition () {
      if (!mainMenu.current) return

      console.log('scroll');
      console.log(window.scrollY);
      if (window.scrollY <= 30) {
        
        await setIsAtTop(true);
        mainMenu.current.classList.add('transition-all');
      }
      else {
        mainMenu.current.classList.add('transition-all');
      }


      

      const onScroll = () => { setIsAtTop(window.scrollY <= 30);console.log(window.scrollY);  }

      window.addEventListener('scroll', () => { onScroll() });
      return () => window.removeEventListener('scroll', () => { onScroll() })
    }

    menuTransition();

  }, [mainMenu])




  const winUrl = window.location.pathname;


  return (
    <>
      <div ref={mainMenu} className="flex flex-row  justify-between bg-white   rounded-[60px] h-[88px] items-center px-[25px] shadow-2xl fixed top-7 inset-x-[8%]  z-100" style={winUrl === '/' ? {} : { top: isAtTop ? '' : '0px', left: isAtTop ? '' : '0px', borderRadius: isAtTop ? '' : '0px', right: isAtTop ? '' : '0px', height: isAtTop ? '' : '100px' }} >
        <div className="main-menu-left-container flex items-center gap-[40px]">
          <NavLink to='/'>
            <img className='w-[10vw] c-sky-200' src="/InvestPoint-logo-with-blacktext-removebg-preview.png" alt="Invest-point-logo" />
          </NavLink>
          {menuLinks.map((item) => {
            return (
              <NavLink key={item} className='main-menu-link' to={`/${item.toLowerCase()}`}>
                {item}
              </NavLink>
            )
          })}
        </div>
        <div className="main-menu-right-container flex items-center gap-[30px] ">
          <div className="search-bar-container flex relative">
            <input className="rounded-[30px] p-[8px] h-[49.5px] pl-[22px] bg-gray-100 outline-none text-[14.5px] " placeholder='Search for Stock' />
            <img src={SearchIcon} className='w-7 absolute search-icon cursor-pointer'></img>
          </div>
          {isLogged ?
            <AccountMenu setIsLogged={setIsLogged} isLogged={isLogged} userEmail={userEmail} />
            :
            <NavLink className='button-primary' to={'/login'}>
              Log in
            </NavLink>
          }


        </div>

      </div>
      {winUrl === '/' ? '' :
        /*<div className="w-full  bg-slate-100 fixed top-[0px] h-[100px] content-end px-[8%] z-98 text-white pb-[10px]">
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