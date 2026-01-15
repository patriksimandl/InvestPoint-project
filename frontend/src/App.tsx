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
import { verification } from './verification'


function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  //const [tableStocksData, setTableStocksData] = useState(JSON.parse(localStorage.getItem('tableStocksData')!) || null);
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);

  useEffect(()=>{
    console.log('isLogged');
    console.log(isLogged);
  },[isLogged])


  const { data: verificationEmail , isError, isSuccess,error} = useQuery({
    queryKey: ["verification"],
    queryFn: verification,
    retry: false,
    staleTime: 1000 * 60 * 10,
  })


useEffect(()=>{
  if(verificationEmail){
    setIsLogged(true);
    setUserEmail(verificationEmail);
  }
},[verificationEmail,isSuccess]);


useEffect(()=>{
  if(isError){
    console.log(error);
    setIsLogged(false);
  }
},[isError,error]);







const {data: tableStocksData} = useQuery({
  queryKey: ["stocksData"],
  queryFn: async () => {
    const response = await axios.get('http://localhost:3000/stocks')
    return response.data
    //localStorage.setItem('tableStocksData', JSON.stringify(response.data));
  },
  //To refetch every 20 min
  staleTime: 1000 * 60 * 20,
});







return (

  <Routes>
    <Route path='/' element={<HomePage isLogged={isLogged} setIsLogged={setIsLogged} userEmail={userEmail} />} />
    <Route path='/login' element={<LoginPage isLogged={isLogged} setIsLogged={setIsLogged} setUserEmail={setUserEmail} />} />
    <Route path='/stocks' element={<StocksPage isLogged={isLogged} tableStocksData={tableStocksData}  setIsLogged={setIsLogged} userEmail={userEmail} />} />
    <Route path='/portfolio' element={<PortfolioPage isLogged={isLogged} setIsLogged={setIsLogged} userEmail={userEmail} />} />
    <Route path='/stocks/:symbol' element={<StockPage isLogged={isLogged} setIsLogged={setIsLogged} userEmail={userEmail} />} />
  </Routes>
)

}

export default App
