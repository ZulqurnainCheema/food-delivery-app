import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/food.route.js"
import userRouter from "./routes/user.route.js";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";
dotenv.config()

//add config

const app = express()

const port = 4000

//middleware

app.use(express.json())
app.use(cors())

//db connection

connectDB(
)

//Api End points

app.use("/api/food",foodRouter)

app.use("/image",express.static("uploads"))

app.use("/api/user",userRouter)

app.use("/api/cart",cartRouter)

app.use("/api/order",orderRouter)


app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})
