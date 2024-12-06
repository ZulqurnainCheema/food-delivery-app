import { foodModel } from "../models/food.models.js";
import multer from "multer";
import fs from "fs";

// ADD FOOD ITEMS
const addFoodItem = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

    const imageUrl = `${req.protocol}://${req.get('host')}/public/${req.file.filename}`

  // Handle price depending on whether sizes are available or not
  let foodPrice;
  if (req.body.sizes === "true") {
    // Expecting the price field to be an array of objects like [{sizeName: "Small", sizePrice: 100}]
    foodPrice = JSON.parse(req.body.price);
  } else {
    // Only one price if sizes are not available
    foodPrice = Number(req.body.price);
  }

  // Handle add-ons if available
  let addOns = [];
  if (req.body.addOns === "true") {
    // Assuming addOnsData contains an array of add-on objects
    addOns = JSON.parse(req.body.addOnsData);
  }

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: foodPrice,
    category: req.body.category,
    image: imageUrl,
    sizes: req.body.sizes === "true", // Convert to boolean
    addOns: addOns.length > 0 ? addOns : null, // Store addOns data if present
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food added" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error while adding food" });
    console.error(error);
  }
};

//all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in listing food" });
  }
};
//remove food
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});
    console.log(req.body.id)
    await foodModel.findByIdAndDelete(req.body.id)
    res.json({success:true,message:"Food removed"})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error while removing"})
  }
};
//get food details
const getFoodDetails =async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);
    if (!food) return res.status(404).send('Food item not found');
    res.json(food);
  } catch (error) {
    res.status(500).send('Server error');
  }}
export { addFoodItem, listFood, removeFood,getFoodDetails };
