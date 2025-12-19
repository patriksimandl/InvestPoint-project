import { useEffect, type Dispatch, type SetStateAction } from 'react';
import { authFirstName, authLastName } from './authNames';
import type { eventProps } from './LoginPage';

type NamesValidation = {
  firstName: boolean;
  secondName: boolean;
};

type NameInputsProps = {
  NamesValidation: NamesValidation;
  setNamesValidation: Dispatch<SetStateAction<NamesValidation>>;
};

export function NameInputs({ NamesValidation, setNamesValidation }: NameInputsProps) {
  const names = ['First Name','Last Name'];

  function setNameValidation(event: eventProps,name: string) {
    if(name === 'First Name'){
      setNamesValidation({ firstName: authFirstName(event), secondName: NamesValidation.secondName })
    }
    else if (name === 'Last Name'){
      setNamesValidation({ firstName: NamesValidation.firstName, secondName: authLastName(event) })
    }
  }

  


  return (
    <>
      {names.map((name) => {
        
        return (
          <div key={name} className="input-container">
            <input className="input-primary" onChange={(event) =>{setNameValidation(event,name)}}
               placeholder="" />
            <label className="input-label">{name}</label>
          </div>
        )
      })}
    </>
  )
}