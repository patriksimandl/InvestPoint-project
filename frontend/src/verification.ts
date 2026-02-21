import axios from "axios";

export const verification = async () => {
  // const response = await axios.get('http://localhost:3000/verify/me', { withCredentials: true });
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/verify/me`, { withCredentials: true });

  if (response.status === 200) {
    //setUserEmail(response.data.email);
    return response.data.email;
  }
  throw 'Unexpected error'
}