import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Order.css';

const Order = () => {
  const [orders, setOrders] = useState([]);  // State to hold orders
  const [loading, setLoading] = useState(true);  // State to handle loading

  // Fetch orders from the backend when component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');  // Assuming token is stored in localStorage
        const response = await axios.get('http://localhost:4000/api/order/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(response.data.orders);  // Set orders to state
        setLoading(false);  // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();  // Call the fetchOrders function
  }, []);

  if (loading) {
    return <div>Loading orders...</div>;  // Show a loading message while orders are being fetched
  }

  return (
    <div className="Order">
      <h2>Your Orders</h2>
      <div className="OrderList">
        {orders.length === 0 ? (
          <p>No orders found.</p>  // Show this message if there are no orders
        ) : (
          orders.map((order, index) => (
            <div key={index} className="OrderItem">
              <h3>Order ID: {order._id}</h3>
              <p><strong>Order Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
              <p><strong>Total Amount:</strong> Rs {order.amount}</p>

              <h4>Delivery Details</h4>
              <p><strong>Name:</strong> {order.address.firstName} {order.address.lastName}</p>
              <p><strong>Email:</strong> {order.address.email}</p>
              <p><strong>Address:</strong> {order.address.address}</p>
              <p><strong>Phone:</strong> {order.address.phone}</p>

              <h4>Items:</h4>
              {Object.keys(order.items).map((key, itemIndex) => {
                const item = order.items[key];
                return (
                  <div key={itemIndex} className="OrderItemDetails">
                    <p><strong>Item:</strong> {item.name}</p>
                    <p><strong>Size:</strong> {item.size}</p>
                    <p><strong>Quantity:</strong> {item.quantity}</p>
                    <p><strong>Price:</strong> Rs {item.price}</p>

                    {item.addOns.length > 0 && (
                      <>
                        <p><strong>Add-ons:</strong></p>
                        <ul>
                          {item.addOns.map((addOn, addOnIndex) => (
                            <li key={addOnIndex}>
                              {addOn.addOnName} - Rs {addOn.addOnPrice}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                );
              })}
              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Order;
