export function authEmail(email : string){
  if (!email.includes('@') || !email.includes('.') || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      return false;

    }

    return true;
}

