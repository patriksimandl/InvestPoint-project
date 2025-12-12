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
  const [logged, setLogged] = useState(true);
  //const [tableStocksData, setTableStocksData] = useState(null);


  //finish to fetch every hour
  /*useEffect(() => {
    async function getStocksData() {
      const response = await axios.get('http://localhost:3000/stocks');

      await setTableStocksData(response.data);
    }

    getStocksData();
  }, []);
  */


  

  const { data: tableStocksData, isLoading } = useQuery({
    queryKey: ["stocksData"],
    queryFn: () => axios.get('http://localhost:3000/stocks').then(response => response.data),
    //To refetch every hour
    staleTime: 1000 * 60 *60,
  });

  







  return (
    
      <Routes>
        <Route path='/' element={<HomePage logged={logged} />} />
        <Route path='/login' element={<LoginPage logged={logged} />} />
        <Route path='/stocks' element={<StocksPage logged={logged} />} />
        <Route path='/portfolio' element={<PortfolioPage logged={logged}/>} />
      </Routes>
  )

}

export default App
