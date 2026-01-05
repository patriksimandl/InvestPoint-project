import axios from "axios";
import dayjs from "dayjs";


export async function transaction(activeButton: 'Buy' | 'Sell', price: number, numberOfShares: number, symbol: string) {
  
  
  const response = await axios.post(`http://localhost:3000/api/orders`, {
    type: activeButton.toUpperCase(),
    price,
    numberOfShares,
    symbol,
  },
    { withCredentials: true }
  )

  if(response.status === 201){
    return 'Transaction was succesful';
  }








}