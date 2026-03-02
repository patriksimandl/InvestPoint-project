import axios from "axios";


export async function transaction(activeButton: 'Buy' | 'Sell', price: number, numberOfShares: number, symbol: string) {
  
  try {
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
  } catch (error: any) {
    // Dispatch rate limit error event if status is 429
    if (error.response?.status === 429) {
      window.dispatchEvent(new Event('rateLimitError'));
    }
    throw error;
  }
}
