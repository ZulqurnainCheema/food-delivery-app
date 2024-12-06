import React from 'react'
import"./Sidebar.css"
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
const Sidbar = () => {
  return (
    <div className='Sidebar'>
      <div className="SidebarOptions">
        <NavLink to="/add"className="SidebarOption">
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/list"className="SidebarOption">
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink to="/orders" className="SidebarOption">
          <img src={assets.order_icon} alt="" />
            <p>Orders</p>
        </NavLink>
      </div>
      
    </div>
  )
}

export default Sidbar
