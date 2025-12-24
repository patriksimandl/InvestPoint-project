import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { authFirstName, authLastName } from './authNames';
import type { eventProps } from './LoginPage';
import { NameInput } from './NameInput';

type NamesValidation = {
  firstName: boolean;
  secondName: boolean;
};

type NameInputsProps = {
  NamesValidation: NamesValidation;
  setNamesValidation: Dispatch<SetStateAction<NamesValidation>>;
};

export function NameInputs({ NamesValidation, setNamesValidation }: NameInputsProps) {
  const names = ['First Name', 'Last Name'];

  const [firstNameFocus,setFirstNameFocus] = useState();

  function setNameValidation(event: eventProps, name: string) {
    if (name === 'First Name') {
      setNamesValidation({ firstName: authFirstName(event), secondName: NamesValidation.secondName })
    }
    else if (name === 'Last Name') {
      setNamesValidation({ firstName: NamesValidation.firstName, secondName: authLastName(event) })
    }
  }




  return (
    <>
      {names.map((name) => {
        return <NameInput key={name} name={name} setNameValidation={setNameValidation} />
        
        
      })}
    </>
  )
}