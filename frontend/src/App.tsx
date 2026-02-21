import { Routes, Route, useLocation } from 'react-router'
import { HomePage } from './pages/HomePage/HomePage'
import { LoginPage } from './pages/LoginPage/LoginPage'
import './App.css'
import { createContext, useContext, useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { StocksPage } from './pages/StocksPage/StocksPage'
import axios from 'axios'
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query'
import { PortfolioPage } from './pages/PortfolioPage/PortfolioPage'
import { StockPage } from './pages/StockPage/StockPage'
import { verification } from './verification'


export const IsLoggedContext = createContext<{ isLogged: boolean, setIsLogged: Dispatch<SetStateAction<boolean>> }>({
  isLogged: false,
  setIsLogged: () => { },
});

export const UserEmailContext = createContext<{ userEmail: string | undefined, setUserEmail: Dispatch<SetStateAction<string | undefined>> }>({
  userEmail: undefined,
  setUserEmail: () => { },
});


function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [isLogged, setIsLogged] = useState(false);

  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
  const { pathname } = useLocation();

  /*useEffect(()=>{
    console.log('isLogged');
    console.log(isLogged);
  },[isLogged])
  */

  const { data: verificationEmail, isError, isSuccess, error } = useQuery({
    queryKey: ["verification"],
    queryFn: verification,
    retry: false,
    staleTime: 1000 * 60 * 10,
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
    window.scrollTo(0, 0);

  }, [pathname])





  return (
    <IsLoggedContext.Provider value={{ isLogged, setIsLogged }}>
      <UserEmailContext.Provider value={{ userEmail, setUserEmail }}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/stocks' element={<StocksPage  />} />
          <Route path='/portfolio' element={<PortfolioPage />} />
          <Route path='/stocks/:symbol' element={<StockPage />} />
        </Routes>
      </UserEmailContext.Provider>
    </IsLoggedContext.Provider>
  )

}

export default App
