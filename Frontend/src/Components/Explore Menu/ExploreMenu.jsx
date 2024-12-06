import React from 'react'
import'./ExploreMenu.css'
import { menu_list } from '../../assets/assets'
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='ExploreMenu' id='ExploreMenu'>
      <h1>Explore our menu</h1>
      <p className='ExploreMenuText'>Choose from a tempting selection of delicious meals, all made with top-quality ingredients and crafted to perfection. Enjoy a dining experience that's fresh, flavorful, and unforgettable!</p>
    <div className="ExploreMenuList">
        {menu_list.map((item,index)=>{
            return (
                <div onClick={()=>setCategory((prev)=>prev===item.menu_name?"All":item.menu_name)} key={index} className='ExploreMenuListItem'>
                    <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
                    <p>{item.menu_name}</p>
                </div>
            )
        })}
    </div>
    <hr />
    </div>
  )
}

export default ExploreMenu
