import type { Dispatch, SetStateAction, ChangeEvent } from 'react';
import type { eventProps } from './LoginPage';

type EmailInputProps = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
};

export function EmailInput({ email, setEmail }: EmailInputProps) {
  function updateEmail(event: eventProps) {
    setEmail(event.target.value);
  }

  return (
    <div className="input-container">
      <input className="input-primary" onChange={updateEmail} value={email} placeholder="" />
      <label className="input-label">Email</label>
    </div>
  );
}

export default EmailInput;
