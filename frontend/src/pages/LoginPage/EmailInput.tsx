import { type Dispatch, type SetStateAction, type ChangeEvent, useState, useEffect } from 'react';
import type { eventProps } from './LoginPage';

type EmailInputProps = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  emailCredentials: boolean,
  resetKey?: number 
};

export function EmailInput({ email, setEmail, emailCredentials,resetKey }: EmailInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [haveBeenClicked,setHaveBeenClicked] = useState(false);

  useEffect(()=>{
    setHaveBeenClicked(false);
  },[resetKey])



  function updateEmail(event: eventProps) {
    setEmail(event.target.value);
  }


  useEffect(() => {
    console.log(emailCredentials);
  }, [emailCredentials])

  return (
    <>
      <div className="input-container relative">
        <input className={`input-primary ${!isFocused  && !emailCredentials && haveBeenClicked ? 'outline outline-2 outline-red-500' : ''}`} onFocus={() => { setIsFocused(true) }} onBlur={() => { setIsFocused(false) }} onChange={updateEmail} value={email} placeholder="" onClick={()=>{setHaveBeenClicked(true)}} />
        <label className="input-label">Email</label>
      </div>
      {!isFocused  && !emailCredentials && haveBeenClicked?

        <div className='w-full rounded-[8px] flex '>
          <div className='flex justify-center items-center px-[7px]' >
            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#a70000ff"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
          </div>
          <div className='text-red-700 text-[15px]'>{email == '' ? 'Manditory' : 'Invalid email'}</div>

        </div>
        :
        ''
      }
    </>
  );
}

export default EmailInput;
