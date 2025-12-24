import './MainMenu.css'
import { NavLink } from 'react-router'
import SearchIcon from '../assets/search-icon.svg'
import { AccountMenu } from './AccountMenu';
import type { Dispatch, SetStateAction } from 'react';

export type MainMenuProps = {
  setIsLogged: Dispatch<SetStateAction<boolean>>;
  isLogged: boolean
  user?: { email?: string } | null
}

export function MainMenu({ isLogged, setIsLogged,user }: MainMenuProps) {
  const menuLinks = ['Portfolio', 'Stocks', 'ETF'];

  

  const winUrl = window.location.pathname;


  return (
    <>
      <div className="flex flex-row  justify-between bg-white   rounded-[60px] h-[88px] items-center px-[25px] shadow-lg fixed top-7 inset-x-[8%]  z-100" >
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
            <AccountMenu setIsLogged={setIsLogged} isLogged={isLogged} user={user}/>
            :
            <NavLink className='button-primary' to={'/login'}>
              Log in
            </NavLink>
          }


        </div>

      </div>
      <div className="w-full bg-white bg-linear-to-br from-sky-300 to-blue-800 fixed top-[0px] h-[160px] content-end px-[8%] z-98 text-white pb-[10px] ">
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
    </>

  )
}