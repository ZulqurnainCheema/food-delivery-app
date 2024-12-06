import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Object, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    date: { type: Date, default: Date.now },
    status:{type:String,default:"Pending"}
});

// Define the model without checking for existing models
const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
