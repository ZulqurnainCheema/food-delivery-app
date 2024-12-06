import express from "express"

import { addFoodItem,listFood,removeFood,getFoodDetails } from "../controllers/food.controllers.js"

import multer from "multer"



//image storage

const storage = multer.diskStorage(
   { destination:"uploads",
    filename:(req,file,cb)=>{
        return cb( null,`${Date.now()}.${file.originalname}`)
    }
   }
)

const upload = multer({
    storage:storage
})
const foodRouter = express.Router()
//add food
foodRouter.post("/add",upload.single("image"),addFoodItem)
//list food
foodRouter.get('/list',listFood)
//remove food
foodRouter.delete("/remove",removeFood)

foodRouter.get('/:id',getFoodDetails)
export default foodRouter;