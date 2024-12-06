import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext"; // Importing global store context for food data
import "./FoodDisplay.css"; // Importing styles specific to the FoodDisplay component
import FoodItem from "../FoodItem/FoodItem"; // Importing the FoodItem component to display individual items

const FoodDisplay = ({ category }) => {
  const { food_list, fetchFoodList } = useContext(StoreContext); // Accessing food list and fetch function from StoreContext

  // Fetch food list when component mounts
  useEffect(() => {
    fetchFoodList();
  }, [fetchFoodList]);

  return (
    <div className="FoodDisplay" id="FoodDisplay">
      <h2>Top dishes near you</h2> {/* Section title */}
      
      <div className="FoodDisplayList">
        {food_list.map((item, index) => {
          // Conditional rendering based on category
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index} // Using index as the key for list rendering
                id={item._id} // Passing food item ID to FoodItem component
                name={item.name} // Passing food item name
                description={item.description} // Passing food description
                price={item.price} // Passing food price details
                image={item.image} // Passing food image
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
