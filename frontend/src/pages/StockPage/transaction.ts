import axios from "axios";
import dayjs from "dayjs";


export async function transaction(activeButton: 'Buy' | 'Sell', price: number, numberOfShares: number, symbol: string) {
  
  
  // const response = await axios.post(`http://localhost:3000/api/orders`, {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
    type: activeButton.toUpperCase(),
    price,
    numberOfShares,
    symbol,
  },
    { withCredentials: true }
  )

  return response








}