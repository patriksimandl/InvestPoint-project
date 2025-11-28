import { useState } from 'react'
import './MainMenu.css'
import { NavLink } from 'react-router'


export function MainMenu() {
  const menuLinks = ['Home', 'My shares', 'Browse'];

  return (
    <div className="flex flex-row  justify-between bg-white mx-[8%]  rounded-[60px] h-[88px] items-center px-[25px] shadow-lg fixed top-7 left-0 right-0">
      <div className="main-menu-left-container flex items-center gap-[40px]">
        <NavLink to='/'>
          <img className='h-[115px] c-sky-200' src="/InvestPoint-logo-with-blacktext-removebg-preview.png" alt="Invest-point-logo" />
        </NavLink>
        {menuLinks.map((item) => {
          return (
            <NavLink className='main-menu-link' to={`/${item.toLowerCase()}`}>
              {item}
            </NavLink>
          )
        })}
      </div>
      <div className="main-menu-right-container">
        <NavLink className='button-primary' to={'/login'}>
          Log in
        </NavLink>
      </div>
    </div>
  )
}