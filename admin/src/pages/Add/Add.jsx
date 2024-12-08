import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
const Add = () => {
  const url = "https://food-delivery-app-2-bdp6.onrender.com";
  const [Image, setImage] = useState(null); // Default to null
  const [Data, setData] = useState({
    name: "",
    description: "",
    price: "", // This will be ignored if sizes are used.
    addOns: false, // Checkbox for AddOns
    sizes: false, // Checkbox for sizes
    category: "pizza", // Default category
  });

  const [Sizes, setSizes] = useState([{ sizeName: "", sizePrice: "" }]); // Dynamic size-price pairs
  const [AddOns, setAddOns] = useState([{ addOnName: "", addOnPrice: "" }]); // Dynamic addon-price pairs

  // Handle form input changes
  const onChangeHandler = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setData((data) => ({ ...data, [name]: checked }));
    } else {
      setData((data) => ({ ...data, [name]: value }));
    }
  };

  // Handle changes in the dynamic size-price pairs
  const handleSizeChange = (index, event) => {
    const { name, value } = event.target;
    const updatedSizes = [...Sizes];
    updatedSizes[index][name] = value;
    setSizes(updatedSizes);
  };

  // Handle changes in the dynamic addon-price pairs
  const handleAddOnChange = (index, event) => {
    const { name, value } = event.target;
    const updatedAddOns = [...AddOns];
    updatedAddOns[index][name] = value;
    setAddOns(updatedAddOns);
  };

  // Add a new size-price pair
  const addSizePricePair = () => {
    setSizes([...Sizes, { sizeName: "", sizePrice: "" }]);
  };

  // Add a new addon-price pair
  const addAddOnPricePair = () => {
    setAddOns([...AddOns, { addOnName: "", addOnPrice: "" }]);
  };

  // Remove a size-price pair
  const removeSizePricePair = (index) => {
    const updatedSizes = Sizes.filter((_, i) => i !== index);
    setSizes(updatedSizes);
  };

  // Remove an addon-price pair
  const removeAddOnPricePair = (index) => {
    const updatedAddOns = AddOns.filter((_, i) => i !== index);
    setAddOns(updatedAddOns);
  };

  // Handle form submission
 const onSubmitHandler = async (event) => {
  event.preventDefault();
  const formData = new FormData();
  
  formData.append("name", Data.name);
  formData.append("description", Data.description);
  formData.append("category", Data.category);
  formData.append("sizes", Data.sizes);
  formData.append("addOns", Data.addOns);

  // Handle image upload
  if (Image) {
    formData.append("image", Image);
  }

  if (Data.sizes) {
    formData.append("price", JSON.stringify(Sizes));
  } else {
    formData.append("price", Number(Data.price));
  }

  if (Data.addOns) {
    formData.append("addOnsData", JSON.stringify(AddOns));
  }
  
  try {
    const response = await axios.post(`${url}/api/food/add`, formData);
    
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "pizza",
        sizes: false,
        addOns: false,
      });
      setSizes([{ sizeName: "", sizePrice: "" }]);
      setAddOns([{ addOnName: "", addOnPrice: "" }]);
      setImage(null);
      toast.success("Product added successfully");
    } else {
      console.error("Failed to add item");
    }
  } catch (error) {
    console.error("Error submitting form: ", error);
  }
};

  
  return (
    <div className="Add">
      <form className="FlexCol" onSubmit={onSubmitHandler}>
        <div className="AddImgUpload FlexCol">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={Image ? URL.createObjectURL(Image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />

          <div className="AddProductName FlexCol">
            <p>Product name</p>
            <input
              onChange={onChangeHandler}
              value={Data.name}
              type="text"
              name="name"
              placeholder="Type Here"
              required
            />
          </div>

          <div className="AddProductDescription FlexCol">
            <p>Product description</p>
            <textarea
              name="description"
              rows="6"
              placeholder="Write content here"
              required
              onChange={onChangeHandler}
              value={Data.description}
            ></textarea>
          </div>

          <div className="AddCategoryPrice">
            <div className="AddCategory FlexCol">
              <p>Product Category</p>
              <select
                onChange={onChangeHandler}
                name="category"
                value={Data.category}
              >
                <option value="Pizza">Pizza</option>
                <option value="Burger">Burger</option>
                <option value="Cold drink">Cold Drinks</option>
                <option value="Chai & coffee">Chai & Coffee</option>
                <option value="Pasta">Pastas</option>
                <option value="Shawarma">Shawarma</option>
                <option value="Fries">Fries</option>
                <option value="Deals">Deal</option>
              </select>
            </div>
            {/* Prices  */}
            <div className="AddSizes">
            <p>Different sizes available</p>
            <input
              onChange={onChangeHandler}
              checked={Data.sizes}
              type="checkbox"
              name="sizes"
            />
          </div>
            <div className="AddPrice FlexCol">
              <p>Product price</p>
              {!Data.sizes ? (
                <input
                  onChange={onChangeHandler}
                  value={Data.price}
                  type="number"
                  name="price"
                  placeholder="Rupees"
                  required
                />
              ) : (
                <div className="SizePricePair">
                  {Sizes.map((size, index) => (
                    <div key={index}>
                      <input
                        onChange={(e) => handleSizeChange(index, e)}
                        value={size.sizeName}
                        type="text"
                        name="sizeName"
                        placeholder="Size"
                        required
                      />
                      <input
                        onChange={(e) => handleSizeChange(index, e)}
                        value={size.sizePrice}
                        type="number"
                        name="sizePrice"
                        placeholder="Price"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removeSizePricePair(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={addSizePricePair}>
                    + Add Size
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* AddOns Section */}
          <div className="AddAddOns">
            <p>Different AddOns available</p>
            <input
              onChange={onChangeHandler}
              checked={Data.addOns}
              type="checkbox"
              name="addOns"
            />
          </div>

          {Data.addOns && (
            <div className="AddOnPricePair">
              {AddOns.map((addOn, index) => (
                <div key={index}>
                  <input
                    onChange={(e) => handleAddOnChange(index, e)}
                    value={addOn.addOnName}
                    type="text"
                    name="addOnName"
                    placeholder="AddOn"
                    required
                  />
                  <input
                    onChange={(e) => handleAddOnChange(index, e)}
                    value={addOn.addOnPrice}
                    type="number"
                    name="addOnPrice"
                    placeholder="Price"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeAddOnPricePair(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={addAddOnPricePair}>
                + Add AddOn
              </button>
            </div>
          )}
        </div>
        <button type="submit" onClick={(e)=>onSubmitHandler(e)} className="AddButton">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default Add;
