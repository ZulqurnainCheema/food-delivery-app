import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
  });

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch cart data and calculate the total price when component mounts
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
        const response = await axios.post(
          `${url}/api/cart/get`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const fetchedCartItems = response.data.cartData;
        setCartItems(fetchedCartItems);

        // Calculate the total price
        const total = Object.values(fetchedCartItems).reduce((acc, item) => {
          const addOnsTotal = item.addOns.reduce(
            (sum, addOn) => sum + addOn.addOnPrice,
            0
          );
          acc += (parseInt(item.price) + addOnsTotal) * item.quantity;
          return acc;
        }, 0);

        setTotalPrice(total);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, [url,data]);
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    let orderItems = cartItems; // Directly assign cartItems without wrapping it in an object
    let orderData = {
      address: data,  // Delivery address
    items: orderItems,  // Cart items
    amount: totalPrice + 2,  // Total price including delivery fee
    };

    try {
      let response = await axios.post( `${url}/api/order/place`, orderData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Use the token for authorization
        },
      });

      if (response.data.success) {
        toast.success("Ordered successfully")
        setData({
          firstName: "",
          lastName: "",
          email: "",
          address: "",
          phone: "",
        })
      }
    } catch (error) {
      toast.error("Error while ordering,try again")
    }
  };

  return (
    <form onSubmit={placeOrder} className="PlaceOrder">
      <div className="PlaceOrderLeft">
        <p className="Title">Delivery Information</p>
        <div className="MultiFields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email Address"
        />
        <input
          required
          name="address"
          onChange={onChangeHandler}
          value={data.address}
          type="text"
          placeholder="Address"
        />
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
      </div>

      <div className="PlaceOrderRight">
        <div className="CartTotals">
          <h2>Cart Total</h2>
          <div className="CartTotalsDetails">
            <p>SubTotal</p>
            <p>Rs {totalPrice}</p>
            <hr />
          </div>
          <div className="CartTotalsDetails">
            <p>Delivery Fee</p>
            <p>Rs {totalPrice === 0 ? 0 : 2}</p>
            <hr />
          </div>
          <div className="CartTotalsDetails">
            <p>Total</p>
            <p>Rs {totalPrice === 0 ? 0 : totalPrice + 2}</p>
          </div>
          <button type="submit">Confirm Order</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
