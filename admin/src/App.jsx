import Navbar from "./components/Navbar/Navbar"
import Sidbar from "./components/Sidbar/Sidebar"
import {Routes,Route} from "react-router-dom"
import Add from "./pages/Add/Add"
import List from "./pages/List/List"
import Order from "./pages/Orders/Order"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import CSS

function App() {
  return (
    <>
    <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="AppContent">
        <Sidbar/>
        <Routes>
          <Route path='/add' element={<Add/>}/>
          <Route path='/list' element={<List/>}/>
          <Route path='/orders' element={<Order/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
