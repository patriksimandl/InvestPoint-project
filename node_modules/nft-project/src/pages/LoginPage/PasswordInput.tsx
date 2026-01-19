import VisibilityIcon from '/visibility-icon.svg';
import VisibilityOffIcon from '/visibility-off-icon.svg';
import CancelIcon from '/cancel-logo.svg'
import type { eventProps } from './LoginPage';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

type PasswordInputProps ={
  passwordValidations: {
    length: boolean,
    upperCase: boolean,
    number: boolean,
    special: boolean
  },
  isRegistrating: boolean,
  setPasswordShown: Dispatch<SetStateAction<boolean>>,
  setPassword: Dispatch<SetStateAction<string>>,
  passwordShown: boolean,
  password: string,
  resetKey?: number
}


export function PasswordInput({passwordValidations, isRegistrating,setPasswordShown,setPassword,passwordShown,password,resetKey} : PasswordInputProps) {
  const [haveBeenClicked,setHaveBeenClicked] = useState(false); 
  const [isFocus, setIsFocus] = useState(false);

  useEffect(()=>{
    setHaveBeenClicked(false);
  },[resetKey]);



   const passwordConditions = [
      {
        condition: passwordValidations.length,
        text: 'Must be at least 9 characters'
      }, {
        condition: passwordValidations.upperCase,
        text: 'Must have at least 1 uppercase character'
      }, {
        condition: passwordValidations.number,
        text: 'Must have at least 1 number'
      }, {
        condition: passwordValidations.special,
        text: 'Must have at least 1 special character'
      }
    ];

    function showPassword() {
        setPasswordShown(!passwordShown);
      }
    
      //conttoled input for password
      function updatePassword(event: eventProps) {
        setPassword(event.target.value);
      }
  return (
    <div className="input-container">
      <img className="visibility-icon" src={passwordShown ? VisibilityOffIcon : VisibilityIcon} onClick={showPassword}></img>
      <input className={`input-primary ${isRegistrating && haveBeenClicked && !Object.values(passwordValidations).every(Boolean) && !isFocus? 'outline-2 outline-red-700' : '' }`} value={password} onChange={updatePassword} onFocus={()=>{setIsFocus(true)}} onBlur={()=>{setIsFocus(false)}} type={passwordShown ? 'text' : "password"} onClick={() =>{setHaveBeenClicked(true)}} placeholder="" />
      <label className="input-label">Password</label>
      {
        Object.values(passwordValidations).every(Boolean) || !isRegistrating ?
          '' :
          <div className="top-[58px] left-[-8px] right-[-8px] input-checker absolute flex-col bg-gray-200/40 backdrop-blur-[5px] px-[13px] py-[15px] transition-all rounded-[20px] text-[15px] text-red-800">
            {passwordConditions.map((obj) => {
              if (obj.condition) {
                return;
              }
              return (
                <div
                  key={obj.text}
                  className="input-checker-div flex items-center"
                >
                  <img className="w-[16px] mr-[4px]" src={CancelIcon}></img>
                  {obj.text}
                </div>
              )
            })}
          </div>
      }
    </div>
  )
}