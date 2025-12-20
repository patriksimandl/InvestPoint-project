import { useState , useRef, useEffect} from 'react'
import AccountIcon from '/accountIcon.svg'
import { } from 'react';
import { type MainMenuProps } from './MainMenu';





export function AccountMenu({setIsLogged}: MainMenuProps ) {
  const [menuActive,setMenuActive] = useState(false);

  const toggleButton = useRef(null);
  const accountMenu = useRef(null);
  

  useEffect(()=>{
    function handleClick(event: MouseEvent){
      
      if(menuActive && accountMenu.current && !accountMenu.current.contains(event.target) && toggleButton.current && !toggleButton.current.contains(event.target)){
        setMenuActive(false);
      }
    }

    document.addEventListener('mousedown',handleClick);
    return () =>{document.removeEventListener('mousedown',handleClick)}
      
    
  },[menuActive]);

  

  

  return (
    <div className='relative'  >
      <img className="cursor-pointer h-[40px] " src={AccountIcon}  ref={toggleButton} onClick={()=>{setMenuActive(!menuActive)}} />
      <div  ref={accountMenu} className={`rounded-[8px] absolute bg-white shadow-lg w-[7vw] top-17 right-2 ${menuActive ? 'flex':'hidden'}`} >
        <div className="hover:bg-gray-300 w-full rounded-[8px] p-[14px] cursor-pointer  flex" onClick={()=>{setIsLogged(false)}}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" /></svg>
          <div className='ml-[10px] text-nowrap'>Log out</div>
        </div>
      </div>
    </div>
  )
}