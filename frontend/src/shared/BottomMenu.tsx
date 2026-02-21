import { NavLink } from 'react-router'
import InvestPointLogo from '/InvestPoint-logo-with-blacktext-removebg-preview.png'


export function BottomMenu( ) {
  const winUrl = window.location.pathname; 


  return (
    <div className="border-t-[2px] border-slate-300 w-full">
      <div className="max-w-7xl mx-auto px-[20px] sm:px-[20px]">
        <div className="flex flex-col w-full gap-6 py-6 md:py-8">
      
        {/* Logo and Navigation Links Row */}
        <div className='flex flex-col md:flex-row md:items-center md:justify-between w-full gap-6 md:gap-8'>
          <NavLink to={'/'}>
            <img src={InvestPointLogo} className='w-36 sm:w-40 md:w-48' />
          </NavLink>
          
          <div className='flex gap-6 md:gap-8 font-semibold'>
            <NavLink to={'/'}>
              Home
            </NavLink>
            <NavLink to={'/portfolio'}>
              Portfolio
            </NavLink>
            
            <NavLink to={'/Stocks'}>
              Stocks
            </NavLink>
          </div>
        </div>

        {/* Description and Social Links Row */}
        <div className='flex flex-col md:flex-row md:items-start md:justify-between w-full gap-4 md:gap-8'>
          <div className='text-slate-500 text-sm sm:text-[15px] leading-relaxed md:max-w-[50%]'>
            The modern standard for global investments. Regulated and secure platform for traders worldwide.
          </div>
          <div className='flex gap-4'>
            <NavLink to='https://instagram.com/patrik.simandl' className='flex justify-center items-center rounded-[100px] bg-slate-200 w-[40px] h-[40px]'>
              <svg fill="#62748e" viewBox="0 0 32 32" id="Camada_1" height="25px" width="25px" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M22.3,8.4c-0.8,0-1.4,0.6-1.4,1.4c0,0.8,0.6,1.4,1.4,1.4c0.8,0,1.4-0.6,1.4-1.4C23.7,9,23.1,8.4,22.3,8.4z"></path> <path d="M16,10.2c-3.3,0-5.9,2.7-5.9,5.9s2.7,5.9,5.9,5.9s5.9-2.7,5.9-5.9S19.3,10.2,16,10.2z M16,19.9c-2.1,0-3.8-1.7-3.8-3.8 c0-2.1,1.7-3.8,3.8-3.8c2.1,0,3.8,1.7,3.8,3.8C19.8,18.2,18.1,19.9,16,19.9z"></path> <path d="M20.8,4h-9.5C7.2,4,4,7.2,4,11.2v9.5c0,4,3.2,7.2,7.2,7.2h9.5c4,0,7.2-3.2,7.2-7.2v-9.5C28,7.2,24.8,4,20.8,4z M25.7,20.8 c0,2.7-2.2,5-5,5h-9.5c-2.7,0-5-2.2-5-5v-9.5c0-2.7,2.2-5,5-5h9.5c2.7,0,5,2.2,5,5V20.8z"></path> </g> </g></svg>
            </NavLink>
            <NavLink to='/' className='flex justify-center items-center rounded-[100px] bg-slate-200 w-[40px] h-[40px]'>
              <svg fill="#62748e" height="22px" width="22px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-337 273 123.5 256" xml:space="preserve" stroke="#62748e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M-260.9,327.8c0-10.3,9.2-14,19.5-14c10.3,0,21.3,3.2,21.3,3.2l6.6-39.2c0,0-14-4.8-47.4-4.8c-20.5,0-32.4,7.8-41.1,19.3 c-8.2,10.9-8.5,28.4-8.5,39.7v25.7H-337V396h26.5v133h49.6V396h39.3l2.9-38.3h-42.2V327.8z"></path> </g></svg>
            </NavLink>
          </div>
        </div>
        </div>
      </div>
    </div>

  )
}