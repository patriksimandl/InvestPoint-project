import type { eventProps } from "./LoginPage"
import { useEffect, useRef, useState } from "react";

type NameInputProps = {
  name: string,
  setNameValidation: (event: eventProps,name: string) => void;
}

export function NameInput({name,setNameValidation}: NameInputProps) {
  const [inputFocus,setInputFocus] = useState(false);
  const [haveBeenClicked, setHaveBeenClicked] = useState(false);
  const [nameValue,setNameValue] = useState('');

  const nameInput = useRef(null);
  
  useEffect(() =>{
    console.log(nameValue);
  },[nameValue])

  return (
    <div className='flex flex-col'>

      <div  className="input-container">
        <input ref={nameInput} className={`input-primary ${!inputFocus && (nameValue=== '' || nameValue === ' ') && haveBeenClicked? 'outline-2 outline-red-700' : ''}`} onFocus={()=>{setInputFocus(true)}} onBlur={()=>{setInputFocus(false)}} onChange={(event) => { setNameValidation(event, name); setNameValue(event.target.value) }} value={nameValue} onClick={()=>{setHaveBeenClicked(true)}}
          placeholder="" />

        <label className="input-label">{name}</label>
      </div>
      {!inputFocus && (nameValue=== '' || nameValue === ' ') && haveBeenClicked? 
      <div className='flex'>
        <div className='flex items-center px-[7px]'>
          <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#a70000ff"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
        </div>
        <div className='text-[15px] text-red-700'>
          Manditory
        </div>
      </div> : ''
      }
    </div>
  )
}