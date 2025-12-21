import axios from "axios";



//Register or login a user
  export async function sendInfo(email : string,password : string, isRegistrating : boolean) {
    



    let response;
    if (isRegistrating) {
      response = await axios.post('http://localhost:3000/auth/register', {
        email,
        password
      },
      //tells the browser to include cookies and enable that client can recive them
      {withCredentials:true});
    }
    else {
      response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password
      },
      {withCredentials:true})
    }

    if (response.status != 201 && response.status != 200){
      console.log('un');
      return response.data;
    }
    
    return 0
    
  }