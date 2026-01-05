import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react"


type ChangeUnitProps ={
  activeUnit: string,
  setActiveUnit: Dispatch<SetStateAction<'Value' | 'Quantity'>>,
  setValue: Dispatch<SetStateAction<number>>;
}

export function ChangeUnit({activeUnit, setActiveUnit,setValue}: ChangeUnitProps) {
  
  const [menuActive,setMenuActive] = useState(false);
  const menu = useRef(null);
  



  const setUnit = ()=>{
    setValue(0)
    if(activeUnit === 'Value')
    {
      setActiveUnit('Quantity');
    }
    else{
      setActiveUnit('Value');
    }
  }

  useEffect(()=>{
  })


  useEffect(() => {
    function handleClick(event: MouseEvent) {

      if (menuActive && menu.current && !menu.current.contains(event.target)) {
        setMenuActive(false);
      }
    }

    document.addEventListener('mousedown', handleClick);
    return () => { document.removeEventListener('mousedown', handleClick) }


  }, [menuActive]);



  return (
    <div className="flex relative justify-center text-lg flex-col mt-5 w-full items-center" ref={menu}>
      <button className="flex w-[120px] px-3 py-1 bg-white rounded-[8px] shadow-lg hover:bg-gray-100 cursor-pointer justify-between" onClick={() => {setMenuActive(!menuActive)}}>
        {activeUnit}
        <div className="flex items-center w-[30px] relative">
          <svg className={`transition-all`}  style={{transform: `${menuActive ? 'rotate(-180deg)' : ''}`}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg>
        </div>
      </button>
      <ul onClick={()=>{setMenuActive(false);setUnit()}} className={`w-[120px] shadow-lg hover:bg-gray-100 absolute top-[100%] rounded-[8px] mt-1 bg-white text-lg px-3 py-1 cursor-pointer ${menuActive ? 'block': 'hidden'}`}>

        <li>{activeUnit === 'Value' ? 'Quantity' : 'Value'}</li>
      </ul>
    </div>
  )
}