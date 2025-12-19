import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage/HomePage'
import { LoginPage } from './pages/LoginPage/LoginPage'
import './App.css'
import { useEffect, useState } from 'react'
import { StocksPage } from './pages/StocksPage/StocksPage'
import axios from 'axios'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { PortfolioPage } from './pages/PortfolioPage/PortfolioPage'


function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [islogged, setIslogged] = useState(false);
  const [tableStocksData,setTableStocksData] = useState(JSON.parse(localStorage.getItem('tableStocksData')!) || null);

  //finish to fetch every hour
  /*useEffect(() => {
    async function getStocksData() {
      const response = await axios.get('http://localhost:3000/stocks');

      await setTableStocksData(response.data);
    }

    getStocksData();
  }, []);
  */


  

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
        <Route path='/' element={<HomePage islogged={islogged} />} />
        <Route path='/login' element={<LoginPage islogged={islogged} setIsLogged={setIslogged}/>} />
        <Route path='/stocks' element={<StocksPage islogged={islogged} tableStocksData={tableStocksData} setTableStocksData={setTableStocksData}/>} />
        <Route path='/portfolio' element={<PortfolioPage islogged={islogged}/>} />
      </Routes>
  )

}

export default App
