


//authentication of password

  //length of array
  export function defLength(passwordArray: string[]) {
    if (passwordArray.length >= 9) {
      return true;
    }
    else {
      return false;
    }
  }


  // define if it is uppercase
  export function defUpperCase(passwordArray: string[]) {

    if (passwordArray.length == 0) {
      return false;

    }

    for (const char of passwordArray) {
      if (char === char.toUpperCase() && (char <= '0' || char >= '9') && !(/[!@#$%^&*(),.?":{}|<>_\-\/\\[\]=+;']/.test(char))) {
        return true;
      }
    }

    return false;
  }

  //define there is a number
  export function defNumber(passwordArray: string[]) {
    for (const char of passwordArray) {
      if (char >= '0' && char <= '9') {
        return true;
      }
    }
    return false;
  }

  //define special character
  export function defSpecialChar(passwordArray: string[]) {
    for (const char of passwordArray) {
      if (/[!@#$%^&*(),.?":{}|<>_\-\/\\[\]=+;']/.test(char)) {
        return true;
      }
    }
    return false;
  }