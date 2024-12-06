import React from "react";
import "./Header.css";
const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite food</h2>
        <p>
          Indulge your taste buds and choose from a wide array of mouthwatering
          meals, each crafted with the finest, high-quality ingredients. Whether
          you're craving something savory, sweet, or a perfect blend of both,
          our menu offers a feast for every palate. 
        </p>
        <button><a href="#ExploreMenu">View Menu</a></button>
      </div>
    </div>
  );
};

export default Header;
