import { useContext, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import './LoginPage.css';

import { defLength, defNumber, defSpecialChar, defUpperCase } from "./authPassword";
import { authEmail } from "./authEmail";

import { sendInfo } from "./sendInfo";
import { PasswordInput } from "./PasswordInput";
import { EmailInput } from "./EmailInput";
import { NameInputs } from "./NamesInput";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { IsLoggedContext } from "../../App";

export type eventProps = {
  target: {
    value: string
  },
}

type LoginPageProps = {
  setUserEmail: Dispatch<SetStateAction<string | undefined>>
}

let passwordArray: string[];

export function LoginPage({ setUserEmail }: LoginPageProps) {
  const { isLogged, setIsLogged } = useContext(IsLoggedContext)!;
  const navigate = useNavigate();
  const [isRegistrating, setIsRegistrating] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailCredentials, setEmailCredentials] = useState(false);
  const [errorMessage, setErrorMessage] = useState<undefined | string>();
  const [resetKey,setResetKey] = useState(0);
  const [NamesValidation, setNamesValidation] = useState({
    firstName: false,
    secondName: false
  });

  //valid password states

  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    upperCase: false,
    number: false,
    special: false,
  });


  const queryClient = useQueryClient();
  useEffect(() => {

    setPasswordShown(false);


    if (isRegistrating) {
      setNamesValidation({
        firstName: false,
        secondName: false
      })
    }
    else {
      setNamesValidation({
        firstName: true,
        secondName: true
      })
    }


  }, [isRegistrating])


  function setRegistration() {

    //when the page is login page
    setIsRegistrating(!isRegistrating);

    setResetKey(resetKey + 1);

    setPassword('');
    setEmail('');
  }

  // Email input handled in EmailInput component

  //auth email
  useEffect(() => {
      setEmailCredentials(authEmail(email));



  }, [email])




  //auth password
  useEffect(() => {
    passwordArray = [...password];

    setPasswordValidations({
      //the length of array is valid
      length: defLength(passwordArray),
      // Uppercase char
      upperCase: defUpperCase(passwordArray),
      // Number
      number: defNumber(passwordArray),
      //special character
      special: defSpecialChar(passwordArray)
    })

  }, [password]);


  async function registerUser() {

    const result = await sendInfo(email, password, isRegistrating);

    if (typeof result === 'object' && result != null) {
      setUserEmail(result.data.email);
      setIsLogged(true);
      navigate(-1);
    }
    else {
      setErrorMessage(result);
    }

    setPassword('');
  }

  

  return (
    <>
      <title>{isRegistrating ? 'Create account' : 'Login'}</title>
      <div className="login-page-container relative flex flex-col lg:flex-row rounded-[26px] w-[92%] sm:w-[86%] lg:w-[80%] xl:w-[85%] max-w-[1200px] shadow-xl max-h-[92vh] lg:max-h-[94vh] xl:max-h-[95vh] lg:min-h-[600px] overflow-auto" >
        <button onClick={() => navigate(-1)} aria-label="Close" className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="image-container w-[55%] hidden lg:inline ">
          <img className="h-[100%] object-cover rounded-l-[30px]" src="/Login-page-img.png" />
        </div>
        <div className="flex flex-col justify-center items-center bg-white px-[24px] sm:px-[40px] lg:px-[70px] py-[24px] lg:w-[45%] md:w-full rounded-[26px] lg:rounded-r-[30px] lg:rounded-l-[0px]">
          <div className="flex content-start  w-full">
            <img className="w-[150px]" src="/InvestPoint-logo-removebg-preview.png" alt="invest-point-logo" />
          </div>
          <div className="font-semibold text-start w-full text-[22px]
      pb-4">{isRegistrating ? `Let's create your InvestPoint account` : 'Log in to your InvestPoint account'}
          </div>
          {errorMessage ?
            <div className="text-red-600 flex border-[1px] border-red-300 relative w-full h-[6vh] text-nowrap bg-red-200 justify-center items-center px-[15px] rounded-[8px] mb-[4px" >

              <div className="">
                {errorMessage}
              </div>

              <div className="ml-auto cursor-pointer " onClick={() => { setErrorMessage(undefined) }}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="fill-current hover:text-red-400" fill="#ff2626ff"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
              </div>



            </div>
            :
            ''
          }

          <div className="flex flex-col sm:flex-row gap-[10px] w-full">
            {isRegistrating ?
              <>

                <NameInputs NamesValidation={NamesValidation} setNamesValidation={setNamesValidation} />
              </>
              : ''
            }
          </div>
          <EmailInput email={email} setEmail={setEmail} emailCredentials={emailCredentials} resetKey={resetKey}/>
          <PasswordInput
            isRegistrating={isRegistrating}
            passwordShown={passwordShown}
            setPasswordShown={setPasswordShown}
            passwordValidations={passwordValidations}
            setPassword={setPassword}
            password={password}
            resetKey={resetKey}
          />

          <button className={`${(Object.values(passwordValidations).every(Boolean) && emailCredentials && Object.values(NamesValidation).every(Boolean)) || (!isRegistrating && emailCredentials) ? 'button-primary' : 'button-primary-inactive pointer-events-none cursor-not-allowed'}  w-full p-2.5 rounded-[8px] mt-[6px]`} onClick={registerUser} >{isRegistrating ? 'Create account' : 'Log in'}
          </button>
          <div className="p-3">
            {isRegistrating ? 'Already have your account?' : 'Is this your first time here?'} <span onClick={setRegistration} className="text-sky-500 underline hover:cursor-pointer hover:text-sky-600">{isRegistrating ? 'Log in' : 'Create account'}</span>
          </div>

        </div>
      </div>
    </>
  )
}