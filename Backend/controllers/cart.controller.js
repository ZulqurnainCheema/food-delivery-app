import userModel from "../models/user.models.js";

// add items to cart
const addtoCart = async (req, res) => {
  try {
    const { userId, itemId, name, price, size, addOns } = req.body;

    // Create a unique identifier for the cart item using itemId, size, and serialized add-ons
    const uniqueCartKey = `${itemId}-${size}-${addOns.map(addOn => addOn.addOnName).join("-")}`;

    // Find user by ID
    let userData = await userModel.findOne({ _id: userId });
    let cartData = userData.cartData || {};

    if (!cartData[uniqueCartKey]) {
      cartData[uniqueCartKey] = {
        itemId,
        name,
        quantity: 1,
        price,
        size,
        addOns,
      };
    } else {
      cartData[uniqueCartKey].quantity += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.json({ success: false, message: "Error while adding to Cart" });
  }
};

//remove from cart
const removefromCart = async (req, res) => {
  try {
    const { userId, itemId, size, addOns } = req.body;

    // Create the unique key for the cart item
    const uniqueCartKey = `${itemId}-${size}-${addOns.map(addOn => addOn.name).join("-")}`;

    // Find user by ID
    let userData = await userModel.findOne({ _id: userId });
    let cartData = userData.cartData || {};

    // Check if the item exists in the cart
    if (cartData[uniqueCartKey]) {
      // Decrease the quantity
      cartData[uniqueCartKey].quantity -= 1;

      // If quantity reaches zero, remove the item from the cart
      if (cartData[uniqueCartKey].quantity <= 0) {
        delete cartData[uniqueCartKey];
      }

      // Update the user's cart in the database
      await userModel.findByIdAndUpdate(userId, { cartData });

      res.json({ success: true, message: "Removed from Cart" });
    } else {
      res.json({ success: false, message: "Item not found in Cart" });
    }
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.json({ success: false, message: "Error while removing from Cart" });
  }
};

//get cart
const getCart = async (req, res) => {
  try {
    const userId = req.body.userId;  // Retrieved from middleware

    const userData = await userModel.findOne({ _id: userId }).select("cartData");

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    return res.json({ success: true, cartData });
  } catch (error) {
    console.error("Error retrieving cart:", error);
    return res.status(500).json({ success: false, message: "Error while retrieving cart" });
  }
};


export { addtoCart , removefromCart , getCart}
