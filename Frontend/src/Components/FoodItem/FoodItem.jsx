import React, { useContext } from "react";
import "./FoodItem.css"; // Importing styles for FoodItem component
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation
import { assets } from "../../assets/assets"; // Importing asset resources
import { StoreContext } from "../../context/StoreContext"; // Accessing StoreContext for backend URL

const FoodItem = ({ id, name, price, description, image }) => {
  const { url } = useContext(StoreContext); // Getting URL from context for dynamic image loading

  return (
    <Link to={`/food/${id}`} className="FoodItem">
      {" "}
      {/* Wrapping the item in a Link for page navigation */}
      <div className="FoodItemImgContainer">
        <img className="FoodItemImg" src={`https://food-delivery-app-2-bdp6.onrender.com/image/ + ${image}`} alt={name} />{" "}
        {/* Displaying food item image */}
      </div>
      <div className="FoodItemInfo">
        <div className="FoodItemNameRating">
          <p>{name}</p> {/* Displaying food item name */}
          <img src={assets.rating_starts} alt="Rating" />{" "}
          {/* Displaying rating stars from assets */}
        </div>
        <p className="FoodItemDesc">{description}</p>{" "}
        {/* Displaying food item description */}
        <p className="FoodItemPrice">
          Rs: {typeof price === "number" ? price : price[0].sizePrice}
        </p>
      </div>
    </Link>
  );
};

export default FoodItem;
