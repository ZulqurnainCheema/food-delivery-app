import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import { getOrders, placeOrder } from "../controllers/order.controller.js"

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder)
orderRouter.get("/all",getOrders)
export default orderRouter