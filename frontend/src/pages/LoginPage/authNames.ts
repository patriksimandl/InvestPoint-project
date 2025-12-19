import type { eventProps } from "./LoginPage";

//When reigstrating auth the first and second name
export function authFirstName(event: eventProps) {
    if (event.target.value != '') {
      return true;
    }
    else {
      return false;
    }
  }

export function authLastName(event: eventProps) {
    if (event.target.value != '') {
      return(true);
    }
    else {
      return(false);
    }
  }