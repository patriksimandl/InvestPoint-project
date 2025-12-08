import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage/HomePage'
import { LoginPage } from './pages/LoginPage/LoginPage'
import './App.css'
import { useState } from 'react'
import{StocksPage} from './pages/StocksPage/StocksPage'


function App() {
  const [menuItems, setMenuItems] = useState([]);
  

  




  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/stocks' element={<StocksPage />} />
    </Routes>
  )

}

export default App
