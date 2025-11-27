import './MainMenu.css'
import { NavLink } from 'react-router'


export function MainMenu() {
  return (
    <div className="font-[Roboto] flex flex-row  justify-between bg-blue-100 mx-[10%] mt-[15px] rounded-[60px] h-[80px] items-center px-[25px]">
      <div className="main-menu-left-container">Left</div>
      <div className="main-menu-right-container">
        <NavLink className='button-primary' to={'/login'}>
            Login
        </NavLink>
      </div>
    </div>
  )
}