import './MainMenu.css'
import { NavLink } from 'react-router'
import SearchIcon from '../assets/search-icon.svg'

export function MainMenu() {
  const menuLinks = ['Home','Stocks', 'ETF'];

  return (
    <div className="flex flex-row  justify-between bg-white mx-[8%]  rounded-[60px] h-[88px] items-center px-[25px] shadow-lg fixed top-7 left-0 right-0">
      <div className="main-menu-left-container flex items-center gap-[40px]">
        <NavLink to='/'>
          <img className='h-[115px] c-sky-200' src="/InvestPoint-logo-with-blacktext-removebg-preview.png" alt="Invest-point-logo" />
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
          <input className="rounded-[30px] p-[8px] h-[49.5px] pl-[22px] bg-gray-100 outline-none text-[14.5px] " placeholder='Search for ETFs'/>
          <img src={SearchIcon} className='w-7 absolute search-icon cursor-pointer'></img>
        </div>
        <NavLink className='button-primary' to={'/login'}>
          Log in
        </NavLink>
      </div>
    </div>
  )
}