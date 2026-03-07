import { Routes, Route, useLocation } from 'react-router'
import { HomePage } from './pages/HomePage/HomePage'
import { LoginPage } from './pages/LoginPage/LoginPage'
import './App.css'
import { createContext, useContext, useEffect, useMemo, useState, type Dispatch, type SetStateAction } from 'react'
import { StocksPage } from './pages/StocksPage/StocksPage'
import axios from 'axios'
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query'
import { PortfolioPage } from './pages/PortfolioPage/PortfolioPage'
import { StockPage } from './pages/StockPage/StockPage'
import { verification } from './verification'
import type { StockData } from './pages/PortfolioPage/types'
import { RateLimitMessage } from './shared/RateLimitMessage'
import { TransactionMessage } from './pages/StockPage/TransactionMessage'


export const IsLoggedContext = createContext<{ isLogged: boolean, setIsLogged: Dispatch<SetStateAction<boolean>> }>({
  isLogged: false,
  setIsLogged: () => { },
});

export const UserEmailContext = createContext<{ userEmail: string | undefined, setUserEmail: Dispatch<SetStateAction<string | undefined>> }>({
  userEmail: undefined,
  setUserEmail: () => { },
});

export const TableStocksDataContext = createContext<null | StockData[]>(null);

export const TransactionContext = createContext<{
  transactionMessage: boolean
  setTransactionMessage: Dispatch<SetStateAction<boolean>>
  transactionType: 'Buy' | 'Sell'
  setTransactionType: Dispatch<SetStateAction<'Buy' | 'Sell'>>
  buyingQuantities: { price: number, numberOfShares: number }
  setBuyingQuantities: Dispatch<SetStateAction<{ price: number, numberOfShares: number }>>
  symbol: string
  setSymbol: Dispatch<SetStateAction<string>>
  animateInMessage: boolean
  setAnimateInMessage: Dispatch<SetStateAction<boolean>>
}>({
  transactionMessage: false,
  setTransactionMessage: () => { },
  transactionType: 'Buy',
  setTransactionType: () => { },
  buyingQuantities: { price: 0, numberOfShares: 0 },
  setBuyingQuantities: () => { },
  symbol: '',
  setSymbol: () => { },
  animateInMessage: false,
  setAnimateInMessage: () => { },
});


function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [isLogged, setIsLogged] = useState(false);

  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
  const location  = useLocation();

  const pathname = location.pathname;


  useEffect(()=>{
    window.scrollTo(0,0);

  },[pathname])
  
  // Transaction message state
  const [transactionMessage, setTransactionMessage] = useState<boolean>(false);
  const [transactionType, setTransactionType] = useState<'Buy' | 'Sell'>('Buy');
  const [buyingQuantities, setBuyingQuantities] = useState({ price: 0, numberOfShares: 0 });
  const [symbol, setSymbol] = useState<string>('');
  const [animateInMessage, setAnimateInMessage] = useState(false);

  const { data: verificationEmail, isError, isSuccess, error } = useQuery({
    queryKey: ["verification"],
    queryFn: verification,
    retry: false,
    staleTime: 1000 * 60 * 1,
  })


  useEffect(() => {
    if (verificationEmail) {
      setIsLogged(true);
      setUserEmail(verificationEmail);
    }
  }, [verificationEmail, isSuccess]);


  useEffect(() => {
    if (isError) {
      console.log(error);
      setIsLogged(false);
    }
  }, [isError, error]);


  const { data: tableStocksData } = useQuery({
    queryKey: ["stocksData"],
    queryFn: async () => {
      //const response = await axios.get('http://localhost:3000/stocks')
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/stocks`);
      return response.data
      //localStorage.setItem('tableStocksData', JSON.stringify(response.data));
    },
    //To refetch every 20 min
    staleTime: 1000 * 60 * 20,
  });
useEffect(() => {
    if (transactionMessage) {
      setAnimateInMessage(true);
    } else {
      setTimeout (() => {
        
        setAnimateInMessage(false);
      }, 500);
    }
  }, [transactionMessage])



  return (
    <TableStocksDataContext.Provider value={tableStocksData} >
      <IsLoggedContext.Provider value={{ isLogged, setIsLogged }}>
        <UserEmailContext.Provider value={{ userEmail, setUserEmail }}>
          <TransactionContext.Provider value={{ 
            transactionMessage, 
            setTransactionMessage, 
            transactionType, 
            setTransactionType, 
            buyingQuantities, 
            setBuyingQuantities,
            symbol,
            setSymbol,
            animateInMessage,
            setAnimateInMessage
          }}>
            <RateLimitMessage />
            {transactionMessage && (
              <TransactionMessage 
                animateInMessage={animateInMessage}
                setTransactionMessage={setTransactionMessage}
                symbol={symbol}
                buyingQuantities={buyingQuantities}
                transactionType={transactionType}
              />
            )}
            
          
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/stocks' element={<StocksPage />} />
            <Route path='/portfolio' element={<PortfolioPage />} />
            <Route path='/stocks/:symbol' element={<StockPage />} />
          </Routes>
          </TransactionContext.Provider >
        </UserEmailContext.Provider>
      </IsLoggedContext.Provider>
    </TableStocksDataContext.Provider>
  )

}

export default App
