import { useEffect, useState } from "react";

import VisibilityIcon from '../../assets/visibility-icon.svg';
import VisibilityOffIcon from '../../assets/visibility-off-icon.svg';
import axios from "axios";

export type eventProps = {
  target: {
    value: string
  }
}

export function LoginPage() {
  const [isRegistrating, setIsRegistrating] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function setRegistration() {
    setIsRegistrating(!isRegistrating);
    setPassword('');
    setEmail('');
  }

  function showPassword() {
    setPasswordShown(!passwordShown);
  }


  useEffect(() => {
    setPasswordShown(false);
  }, [isRegistrating])



  function updateEmail(event: eventProps) {
    setEmail(event.target.value);

  }

  function updatePassword(event: eventProps) {
    setPassword(event.target.value);
  }

  //Register or login a user
  async function sendInfo() {
    if (!email.includes('@') || !email.includes('.')) {
      setEmail('');
      return
    }

    let response;
    if (isRegistrating) {
      response = await axios.post('http://localhost:3000/api/register', {
        email,
        password
      });
    }
    else {
      response = await axios.post('/api/login', {
        email,
        password
      })
    }
  }

  return (
    <>
      <title>{isRegistrating ? 'Create account' : 'Login'}</title>
      <div className="login-page-container flex flex-row rounded-[30px] w-[70%] shadow-xl h-[662px]" >
        <div className="w-[55%]">
          <img className="h-[100%] object-cover rounded-l-[30px]" src="/Login-page-img.png" />
        </div>
        <div className=" flex flex-col justify-center items-center bg-white  p-[100px]  w-[45%] rounded-r-[30px]">
          <div className="flex content-start  w-full">
            <img className="w-[150px]" src="/InvestPoint-logo-removebg-preview.png" alt="invest-point-logo" />
          </div>
          <div className="font-semibold text-start w-full text-[22px]
      pb-4">{isRegistrating ? `Let's create your InvestPoint account` : 'Log in to your InvestPoint account'}</div>
          <div className="flex gap-[10px] w-full">
            {isRegistrating ?
              <>
                <div className="input-container">
                  <input className="input-primary" placeholder="" />
                  <label className="input-label">First name</label>
                </div>
                <div className="input-container">
                  <input className="input-primary" placeholder="" />
                  <label className="input-label ">Last name</label>
                </div>
              </>
              : ''
            }
          </div>
          <div className="input-container">
            <input className="input-primary" onChange={updateEmail} value={email} placeholder="" />
            <label className="input-label" >Email</label>
          </div>
          <div className="input-container">
            <img className="visibility-icon" src={passwordShown ? VisibilityOffIcon : VisibilityIcon} onClick={showPassword}></img>
            <input className="input-primary" value={password} onChange={updatePassword} type={passwordShown ? 'text' : "password"} placeholder="" />
            <label className="input-label">Password</label>
          </div>
          <button className="button-primary w-full p-2.5 rounded-[8px] mt-[6px]" onClick={sendInfo}>{isRegistrating ? 'Create account' : 'Log in'}</button>
          <div className="p-3">
            Already have your account? <span onClick={setRegistration} className="text-sky-500 underline hover:cursor-pointer hover:text-sky-600">{isRegistrating ? 'Log in' : 'Create account'}</span>
          </div>

        </div>
      </div>
    </>
  )
}