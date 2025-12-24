import axios from "axios";



//Register or login a user
export async function sendInfo(email: string, password: string, isRegistrating: boolean) {




  let response;
  try {
    if (isRegistrating) {
      response = await axios.post('http://localhost:3000/auth/register', {
        email,
        password
      },
        //tells the browser to include cookies and enable that client can recive them
        { withCredentials: true });
    }
    else {
      response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password
      },
        { withCredentials: true })
    }
  } catch (error: any) {


    if (error.response) {
      if (error.response.status === 401) {
        return 'Email or password are incorrect'
      }
      return `Error status: ${error.response.status}`
    }
    else if (error.request) {
      return error.request
    }
    else{
      return `Error ${error.message}`;
    }
    
  }

  if (response.status != 201 && response.status != 200) {
    console.log(response.status);
    return response.data;
  }

  return 0

}