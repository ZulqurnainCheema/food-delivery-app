import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import './Cart.css'; // Import the CSS file for styling
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

const Cart = () => {
  const { url, food_list } = useContext(StoreContext); // Access `setTotalPrice` from context
  const [cartData, setCartData] = useState(null); // State to hold cart data

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.post(`${url}/api/cart/get`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you're storing the token in localStorage
          },
        });
        const fetchedCartData = response.data.cartData;
        setCartData(fetchedCartData); // Store the cart data in state
        // Calculate total price and save it to context // Save total price to context
      } catch (error) {
        console.error("Error fetching cart data:", error.response?.data || error.message);
      }
    };
    fetchCartData();
  }, [url]); // Add setTotalPrice to dependencies

  // Function to find item by itemId from food_list
  const findItemById = (itemId) => {
    return food_list.find(item => item._id === itemId); // Assuming each item in food_list has an `_id` property
  };

  // Function to calculate the total price of an item including add-ons
  const calculateItemTotalPrice = (item) => {
    const addOnsPrice = item.addOns.reduce((acc, addOn) => acc + addOn.addOnPrice, 0);
    return (parseInt(item.price) + addOnsPrice) * item.quantity;
  };
  const removeItemFromCart = async (itemId, size, addOns) => {
    try {
      const response = await axios.post(`${url}/api/cart/remove`, {
        itemId,
        size,
        addOns: addOns.map(addOn => ({ name: addOn.addOnName })), // Ensure the structure matches what the server expects
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (response.data.success) {
        // Update cart data by refetching or modifying the local state
        setCartData(prevCartData => {
          const updatedCartData = { ...prevCartData };
          const uniqueCartKey = `${itemId}-${size}-${addOns.map(addOn => addOn.addOnName).join("-")}`;
  
          if (updatedCartData[uniqueCartKey]) {
            // Reduce quantity or remove the item if quantity is zero
            updatedCartData[uniqueCartKey].quantity -= 1;
            if (updatedCartData[uniqueCartKey].quantity <= 0) {
              delete updatedCartData[uniqueCartKey];
            }
          }
  
          return updatedCartData;
        });
      } else {
        console.error('Failed to remove item:', response.data.message);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error.response?.data || error.message);
    }
  };
  

  if (!cartData) {
    return <div>Loading cart...</div>;
  }

  return (
    <div className="Cart">
      <h2>Your Cart</h2>

      {Object.keys(cartData).length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="CartItemsTitle">
            <div>Product</div>
            <div>Description</div>
            <div>Quantity</div>
            <div>Total</div>
            <div></div> {/* Empty space for the cross/delete icon */}
          </div>

          <hr />

          {Object.entries(cartData).map(([key, item]) => {
            const foodItem = findItemById(item.itemId); // Find the food item by itemId
            return (
              <div key={key} className="CartItemsItems">
                {foodItem ? (
                  <img src={url + "/image/" + foodItem.image} alt={foodItem.name} /> // Use the image from the food_item
                ) : (
                  <img src={`${url}/images/default.jpg`} alt="Default" /> // Fallback image if not found
                )}
                <div>
                  <h3>{item.name}</h3>
                  <p>Size: {item.size}</p>
                  {item.addOns && item.addOns.length > 0 && (
                    <ul>
                      {item.addOns.map((addOn, index) => (
                        <li className='AddOns' key={index}>
                          {addOn.addOnName} - Rs {addOn.addOnPrice}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className='Quantity'>{item.quantity}</div>
                <div>Rs {calculateItemTotalPrice(item)}</div>
                <div className="Cross">
                  <img
                    src={assets.cross_icon}
                    alt="Remove item"
                    onClick={() => removeItemFromCart(item.itemId, item.size, item.addOns)} // Call remove function on click
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </div>
            );
          })}

          <div className="CartBottom">
            <div className="CartPromoCode">
              <p>Have a promo code?</p>
              <div className="CartPromoCodeInput">
                <input type="text" placeholder="Enter promo code" />
                <button>Apply</button>
              </div>
            </div>

            <div className="CartTotals">
              <div className="CartTotalsDetails">
                <p>Subtotal</p>
                <p>Rs{
                  Object.values(cartData).reduce((acc, item) => acc + calculateItemTotalPrice(item), 0)
                }</p>
              </div>
              <hr />
              <div className="CartTotalsDetails">
                <p>Total</p>
                <p>Rs{
                  Object.values(cartData).reduce((acc, item) => acc + calculateItemTotalPrice(item), 0)
                }</p>
              </div>
              <button><Link to="/order" >Proceed to Checkout</Link> </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
