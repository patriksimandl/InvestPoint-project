import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage/HomePage'
import { LoginPage } from './pages/HomePage/LoginPage'
import axios from 'axios'
import './App.css'
import { useEffect, useState } from 'react'


function App() {
  const [menuItems, setMenuItems] = useState([]);


  const getMenuItems = async () => {
    console.log('ahoj');
    const response = await axios.get('http://localhost:3000/menu')

    await setMenuItems(response.data);
    console.log('ahoj');
  }


  useEffect(() => {


    getMenuItems();
  }, [])





  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  )

}

export default App
