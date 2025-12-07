import { useEffect, useState } from "react";
import './LoginPage.css';

import VisibilityIcon from '../../assets/visibility-icon.svg';
import VisibilityOffIcon from '../../assets/visibility-off-icon.svg';
import axios from "axios";
import CancelIcon from '../../assets/cancel-logo.svg'

export type eventProps = {
  target: {
    value: string
  },


}


let passwordArray: string[];

export function LoginPage() {
  const [isRegistrating, setIsRegistrating] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCredentials, setPasswordCredentials] = useState(false);
  const [emailCredentials, setEmailCredentials] = useState(false);
  const [firstNameAuth, setFirstNameAuth] = useState(true);
  const [lastNameAuth, setLastNameAuth] = useState(true);


  //valid password states
  const [length, setLength] = useState(false);

  const [upperCase, setUpperCase] = useState(false);

  const [number, setNumber] = useState(false);

  const [special, setSpecial] = useState(false);


  const passwordConditions = [
    {
      condition: length,
      text: 'Must be at least 9 characters'
    }, {
      condition: upperCase,
      text: 'Must have at least 1 uppercase character'
    }, {
      condition: number,
      text: 'Must have at least 1 number'
    }, {
      condition: special,
      text: 'Must have at least 1 special character'
    }
  ];

    useEffect(() => {

      setPasswordShown(false);


      if(isRegistrating){
        setFirstNameAuth(false);
        setLastNameAuth(false);
      }
      else{
        setFirstNameAuth(true);
        setLastNameAuth(true);
      }
      

  }, [isRegistrating])


  function setRegistration() {
    //when the page is login page
    
    setIsRegistrating(!isRegistrating);
    setPassword('');
    setEmail('');
  }


    //controled input for email
  function updateEmail(event: eventProps) {
    setEmail(event.target.value);
  }

  //auth email
  useEffect(() => {
    
    if (!email.includes('@') || !email.includes('.') || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      return setEmailCredentials(false);

    }

    setEmailCredentials(true);
  }, [email])

  


  function showPassword() {
    setPasswordShown(!passwordShown);
  }

  //conttoled input for password
  function updatePassword(event: eventProps) {
    setPassword(event.target.value);
  }


  //authentication of password

  //length of array
  function defLength(passwordArray: string[]) {
    if (passwordArray.length >= 9) {
      setLength(true);
      return true;
    }
    else {
      setLength(false)
      return false;
    }
  }


  // define if it is uppercase
  function defUpperCase(passwordArray: string[]) {

    if (passwordArray.length == 0) {
      setUpperCase(false);
      return false;

    }

    for (const char of passwordArray) {
      if (char === char.toUpperCase() && (char <= '0' || char >= '9') && !(/[!@#$%^&*(),.?":{}|<>_\-\/\\[\]=+;']/.test(char))) {
        setUpperCase(true);
        return true;
      }
    }

    setUpperCase(false);
    return false;
  }

  //define there is a number
  function defNumber(passwordArray: string[]) {
    for (const char of passwordArray) {
      if (char >= '0' && char <= '9') {
        setNumber(true);
        return true;
      }
    }
    setNumber(false);
    return false;
  }

  //define special character
  function defSpecialChar(passwordArray: string[]) {
    for (const char of passwordArray) {
      if (/[!@#$%^&*(),.?":{}|<>_\-\/\\[\]=+;']/.test(char)) {
        setSpecial(true);
        return true;
      }
    }
    setSpecial(false);
    return false;
  }

  //password conditions
  useEffect(() => {
    passwordArray = [...password];


    //the length of array is valid
    const lengthOk = defLength(passwordArray);


    // Uppercase char
    const upperOk = defUpperCase(passwordArray);


    // Number 
    const numberOk = defNumber(passwordArray)


    //special character
    const specialOk = defSpecialChar(passwordArray)

    if (lengthOk && upperOk && numberOk && specialOk) {
      setPasswordCredentials(true);
    }
    else {
      setPasswordCredentials(false);
    }

  }, [password]);


  //When reigstrating auth the first and second name
  function authFirstName(event: eventProps) {
    if (event.target.value != '') {
      setFirstNameAuth(true);
    }
    else {
      setFirstNameAuth(false);
    }
  }

  function authLastName(event: eventProps) {
    if (event.target.value != '') {
      setLastNameAuth(true);
    }
    else {
      setLastNameAuth(false);
    }
  }



  //Register or login a user
  async function sendInfo() {



    let response;
    if (isRegistrating) {
      response = await axios.post('http://localhost:3000/api/register', {
        email,
        password
      });
    }
    else {
      response = await axios.post('http://localhost:3000/api/login', {
        email,
        password
      })
    }
    setEmail('');
    setPassword('');
  }

  return (
    <>
      <title>{isRegistrating ? 'Create account' : 'Login'}</title>
      <div className="login-page-container flex flex-row rounded-[30px] w-[70%] shadow-xl h-154" >
        <div className="image-container w-[55%] hidden lg:inline ">
          <img className="h-[100%] object-cover rounded-l-[30px]" src="/Login-page-img.png" />
        </div>
        <div className=" flex flex-col justify-center items-center bg-white  p-[80px] lg:p-[90px]  lg:w-[45%] md:w-full rounded-[30px]  lg:rounded-r-[30px] lg:rounded-l-[0px]">
          <div className="flex content-start  w-full">
            <img className="w-[150px]" src="/InvestPoint-logo-removebg-preview.png" alt="invest-point-logo" />
          </div>
          <div className="font-semibold text-start w-full text-[22px]
      pb-4">{isRegistrating ? `Let's create your InvestPoint account` : 'Log in to your InvestPoint account'}</div>
          <div className="flex gap-[10px] w-full">
            {isRegistrating ?
              <>
                <div className="input-container">
                  <input className="input-primary" onChange={authFirstName} placeholder="" />
                  <label className="input-label">First name</label>
                </div>
                <div className="input-container">
                  <input className="input-primary" placeholder="" onChange={authLastName} />
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
            {
              passwordCredentials || !isRegistrating ?
                '' :
                <div className="top-[58px] left-[-8px] right-[-8px] input-checker absolute flex-col bg-gray-200/40 backdrop-blur-[5px] px-[13px] py-[15px] transition-all rounded-[20px] text-[15.5px] text-red-800">
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
          <button className={`${(passwordCredentials && emailCredentials && firstNameAuth && lastNameAuth ) || (!isRegistrating && emailCredentials)? 'button-primary' : 'button-primary-inactive pointer-events-none cursor-not-allowed'}  w-full p-2.5 rounded-[8px] mt-[6px]`} onClick={sendInfo}>{isRegistrating ? 'Create account' : 'Log in'}</button>
          <div className="p-3">
            Already have your account? <span onClick={setRegistration} className="text-sky-500 underline hover:cursor-pointer hover:text-sky-600">{isRegistrating ? 'Log in' : 'Create account'}</span>
          </div>

        </div>
      </div>
    </>
  )
}