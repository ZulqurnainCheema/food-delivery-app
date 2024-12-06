import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Routes,Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Footer from './Components/Footer/Footer'
import LoginPopup from './Components/LoginPopup/LoginPopup'
import FoodDetail from './Components/Food Details/FoodDetails'
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [ShowLogin, setShowLogin] = useState(false)
  return (
    <> 
    {ShowLogin?<LoginPopup setShowLogin={setShowLogin} />:<></>}
    <div className='app'>
    <ToastContainer/>
    <Navbar setShowLogin={setShowLogin}/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/order' element={<PlaceOrder/>} />
      <Route path="/food/:id" element={<FoodDetail />} />
    </Routes>
  </div>
  <Footer/>
  
  </>
   
  )
}

export default App
