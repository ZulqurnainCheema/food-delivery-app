import orderModel from "../models/order.models.js";
import userModel from "../models/user.models.js";

// Placing user order for frontend
const placeOrder = async (req, res) => {
    try {
        // Ensure that user ID is provided
        const userId = req.body.userId;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        // Fetch the user details using the user ID
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Use the user's cart data from the user document
        const cartItems = user.cartData;

        if (!cartItems || Object.keys(cartItems).length === 0) {
            return res.status(400).json({ error: "Cart is empty, cannot place order" });
        }

        // Create a new order using data from the request and user's cart data
        const newOrder = new orderModel({
            userId: userId,
            items: cartItems,  // Use the user's cart data from the user document
            amount: req.body.amount,  // Total amount from the request
            address: req.body.address,  // Delivery address
            status: "pending",  // Set default order status
        });

        // Save the new order
        await newOrder.save();

        // Clear the user's cart after placing the order
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // Send success response
        res.status(200).json({ success: true, message: "Order placed successfully" });

    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ error: "Failed to place order" });
    }
};
// Controller to fetch all orders
const getOrders = async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await orderModel.find();

    // Send the orders as a response
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, error: "Failed to fetch orders" });
  }
};


export { placeOrder,getOrders };
