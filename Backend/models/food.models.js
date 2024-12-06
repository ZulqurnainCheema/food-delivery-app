import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sizes: {
    type: Boolean,
    default: false,
  },
  addOns: [{
    addOnName: String,
    addOnPrice: {
      type: Number,
      required: true,
    },
  }],
});

// Exporting the model
export const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);
