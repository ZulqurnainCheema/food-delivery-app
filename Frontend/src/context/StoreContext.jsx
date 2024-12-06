import React, { createContext, useState } from "react";
import axios from "axios"
// Create the StoreContext
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [food_list, setFoodList] = useState([]);    // State to hold food items list
  const [token, setToken] = useState("");          // State to hold auth token
  const url = "https://food-delivery-app-2-bdp6.onrender.com";             // API base URL

  // Function to fetch the food list from the server
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data); // Set the food list data
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  // The context value that will be passed to the rest of the application
  const contextValue = {
    food_list,             // Expose the food items list
    fetchFoodList,        // Function to fetch food list manually
    url,                  // Expose the base URL for API requests
    token,                // Expose the token for authentication
    setToken,             // Allow setting the token from other components
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
