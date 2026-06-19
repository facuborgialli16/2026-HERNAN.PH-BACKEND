import express from "express"
import productController from "../controllers/product.controller.js"
import { verifyToken, isOwner } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/products", verifyToken, isOwner, productController.create)
router.get("/products", productController.getAll)
router.put("/products/:product_id", verifyToken, isOwner, productController.update)
router.delete("/products/:product_id", verifyToken, isOwner, productController.delete)

export default router