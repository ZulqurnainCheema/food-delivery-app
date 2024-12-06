import express from "express"
import { addFoodItem, listFood, removeFood, getFoodDetails } from "../controllers/food.controllers.js"
import multer from "multer"
import path from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
      return cb(null, true)
    } else {
      cb('Error: Images only!')
    }
  }
})

const foodRouter = express.Router()

foodRouter.post("/add", upload.single("image"), addFoodItem)
foodRouter.get('/list', listFood)
foodRouter.delete("/remove", removeFood)
foodRouter.get('/:id', getFoodDetails)

export default foodRouter