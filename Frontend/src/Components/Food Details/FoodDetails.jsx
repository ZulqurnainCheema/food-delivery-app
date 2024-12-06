import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import "./FoodDetails.css";
import { toast } from "react-toastify";
const FoodDetail = () => {
  const { id } = useParams(); // Get the food id from the URL
  const { url } = useContext(StoreContext); // Get backend URL from context
  const [foodData, setFoodData] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  useEffect(() => {
    const fetchFoodDetail = async () => {
      try {
        const response = await axios.get(`${url}/api/food/${id}`);
        setFoodData(response.data);
      } catch (error) {
        console.error("Error fetching food detail:", error);
      }
    };

    fetchFoodDetail();
  }, [id, url]);

  // Handle form submission (Add to Cart)
  const handleAddToCart = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token"); // Get token from local storage

    if (!token) {
      toast.error("Login is needed")
      return;
    }

    // Prepare data to send
    const cartData = {
      itemId: id,
      name: foodData.name,
      price: selectedSize ? selectedSize.sizePrice : foodData.price, // Handle size if applicable
      size: selectedSize ? selectedSize.sizeName : null,
      addOns: selectedAddOns,
    };
  
    try {
      const response = await axios.post(
        `${url}/api/cart/add`,
        cartData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        }
      );

      if (response.data.success) {
        toast.success("Added to cart successfully")
      } else {
       toast.error("Failed to add item to cart")
      }
    } catch (error) {
      toast.error("Error adding item to cart");
    }
  };

  // Handle size selection
  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  // Handle add-ons selection
  const handleAddOnChange = (addOn, isChecked) => {
    if (isChecked) {
      setSelectedAddOns((prev) => [...prev, addOn]);
    } else {
      setSelectedAddOns((prev) => prev.filter((item) => item !== addOn));
    }
  };

  if (!foodData) return <p>Loading...</p>;

  return (
    <form onSubmit={handleAddToCart}>
      <div className="FoodDetail">
        <div className="FoodDetailImgContainer">
          <img src={`${url}/image/${foodData.image}`} alt={foodData.name} />
        </div>
        <div className="FoodDetailInfo">
          <h1>{foodData.name}</h1>
          <p><strong>{foodData.description}</strong></p>
          <p>Category: {foodData.category}</p>
          <hr />
          {foodData.sizes ? (
            <div>
              <h3>Sizes and Prices:</h3>
              <div>
                {foodData.price.map((size, index) => (
                  <p key={index}>
                    <input
                      type="radio"
                      name="size"
                      id={`size_${index}`}
                      onChange={() => handleSizeChange(size)}
                    />
                    {size.sizeName}: Rs. {size.sizePrice}
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <p>Price: Rs. {foodData.price}</p>
          )}
          <hr />
          {foodData.addOns && (
            <div>
              <h3>Add-Ons:</h3>
              <div>
                {foodData.addOns.map((addOn, index) => (
                  <p key={index}>
                    <input
                      type="checkbox"
                      name="addOn"
                      id={`addon_${index}`}
                      onChange={(e) => handleAddOnChange(addOn, e.target.checked)}
                    />
                    {addOn.addOnName}: Rs. {addOn.addOnPrice}
                  </p>
                ))}
              </div>
            </div>
          )}
          <button type="submit">Add to Cart</button>
          <p><strong>Note:</strong> To order the same pizza in two different sizes, follow these steps:</p>
<ul>
  <li>Select the pizza and choose your desired size.</li>
  <li>Click the <strong>Add to Cart</strong> button.</li>
  <li>Adjust the size to your second preference and click <strong>Add to Cart</strong> again to add the second pizza in the new size.</li>
</ul>
<p><strong>Important:</strong> When selecting <strong>AddOns</strong>, make all your choices in a single step to ensure they are applied only once.</p>

        </div>
      </div>
    </form>
  );
};

export default FoodDetail;
