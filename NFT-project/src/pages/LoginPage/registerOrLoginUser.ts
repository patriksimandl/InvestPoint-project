import axios from "axios";

//Register or login a user
  export async function sendInfo(email : string,password : string, isRegistrating : boolean) {



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

    if (response.status != 201 && response.status != 200){
      return response.data;
    }
    return 0
    
  }