import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage/HomePage'
import { LoginPage } from './pages/LoginPage/LoginPage'
import './App.css'
import { useEffect, useState } from 'react'
import{StocksPage} from './pages/StocksPage/StocksPage'
import axios from 'axios'


function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [logged,setLogged] = useState(true);
  const [tableStocksData,setTableStocksData] = useState(null);


  //finish to fetch every hour
  useEffect(()=>{
    async function getStocksData(){
      const response = await axios.get('http://localhost:3000/stocks');

      await setTableStocksData(response.data);
    }

    getStocksData();
  },[]);




  




  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/stocks' element={<StocksPage logged={logged} tableStocksData={tableStocksData} />} />
    </Routes>
  )

}

export default App
