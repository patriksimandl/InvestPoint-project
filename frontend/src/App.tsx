import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage/HomePage'
import { LoginPage } from './pages/LoginPage/LoginPage'
import './App.css'
import { useEffect, useState } from 'react'
import { StocksPage } from './pages/StocksPage/StocksPage'
import axios from 'axios'
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query'
import { PortfolioPage } from './pages/PortfolioPage/PortfolioPage'
import { StockPage } from './pages/StocksPage/StockPage/StockPage'


function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [tableStocksData, setTableStocksData] = useState(JSON.parse(localStorage.getItem('tableStocksData')!) || null);
  const [user,setUser] = useState<object | undefined>(undefined);



  const {data: verification = true } = useQuery({
    queryKey: ["verification"],
    queryFn: async () => {
      try {
        const response = await axios.get('http://localhost:3000/verify/me', { withCredentials: true });

        if (response.status === 200) {
          setUser(response.data.user);
          setIsLogged(true);
          return true;
        }
      } catch (error : any) {
        return false
      }
      
    },
    retry: 1,
    staleTime: 1000 * 60 * 10,
  })



  useQuery({
    queryKey: ["stocksData"],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/stocks')
      setTableStocksData(response.data);
      localStorage.setItem('tableStocksData', JSON.stringify(response.data));
    },
    //To refetch every 20 min
    staleTime: 1000 * 60 * 20,
  });







  return (

    <Routes>
      <Route path='/' element={<HomePage isLogged={isLogged} setIsLogged={setIsLogged} user={user}/>} />
      <Route path='/login' element={<LoginPage isLogged={isLogged} setIsLogged={setIsLogged} />} />
      <Route path='/stocks' element={<StocksPage isLogged={isLogged} tableStocksData={tableStocksData} setTableStocksData={setTableStocksData} setIsLogged={setIsLogged} user={user} />} />
      <Route path='/portfolio' element={<PortfolioPage verification={verification} isLogged={isLogged} setIsLogged={setIsLogged} user={user} />} />
      <Route path='/stocks/:stock' element={<StockPage isLogged={isLogged} setIsLogged={setIsLogged} user={user}/>}/>
    </Routes>
  )

}

export default App
