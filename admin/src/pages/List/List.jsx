import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
const List = () => {
  const [list, setList] = useState([]);
  const url = "http://localhost:4000";
  const fetchList = async () => {
    const responce = await axios.get(`${url}/api/food/list`);
    console.log(responce.data);
    if (responce.data.success) {
      setList(responce.data.data);
    } else {
      toast.error("Error while loading products");
    }
  };
  const removeFood = async (foodid) => {
    try {
      console.log(foodid);
      // Use POST method if sending data with body
      const response = await axios.delete(`${url}/api/food/remove`, {
        data: { id: foodid },
      });
      if (response.data.success) {
        await fetchList();
      } else {
        console.error("Error removing food:", response.data.message);
      }
    } catch (error) {
      console.error("Error removing food:", error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="List Add FlexCol">
      <p>All Foods List</p>
      <div className="ListTableFormat">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>AddOns</b>
        <b>Action</b>
      </div>
      {list.map((item, index) => (
        <div key={index} className="ListTableFormat Title">
          <img src={`${url}/image/` + item.image} alt="" />
          <p>
            <strong>Name:</strong>
            {item.name}
          </p>
          <p>
            <strong>Category:</strong>
            {item.category}
          </p>
          <div>
            {typeof item.price === "number" ? (
              <div>
                <span>
                  <strong>Price:</strong>
                </span>
                <span>
                  Rs: {typeof price === "number" ? price : item.price}
                </span>
              </div>
            ) : (
              item.price.map((price, index) => (
                <div key={index}>
                  <div>
                    <span>
                      <strong>{price.sizeName}:</strong>
                    </span>
                    <span>Rs{price.sizePrice}</span>
                  </div>
                </div>
              ))
            )}
          </div>
          <p>
            {item.addOns && item.addOns.length > 0 ? (
              item.addOns.map((addOn, index) => (
                <div key={index}>
                  <div>
                    <span>
                      <strong>{addOn.addOnName}:</strong>
                    </span>
                    <span>Rs{addOn.addOnPrice}</span>
                  </div>
                </div>
              ))
            ) : (
              <span>No Add-Ons</span> // You can display this message or handle it differently if there are no add-ons
            )}
          </p>
          <p onClick={() => removeFood(item._id)} className="Cursor">
            X
          </p>
        </div>
      ))}
    </div>
  );
};

export default List;
