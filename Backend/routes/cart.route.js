import express from "express"
import { addtoCart, getCart, removefromCart } from "../controllers/cart.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"

const cartRouter = express.Router()

cartRouter.post('/add',authMiddleware,addtoCart)
cartRouter.post("/remove",authMiddleware,removefromCart)
cartRouter.post('/get',authMiddleware,getCart)

export default cartRouter