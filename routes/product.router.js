import express from "express"
import productController from "../controllers/product.controller.js"
import { verifyToken, isOwner } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/api/products", verifyToken, isOwner, productController.create)
router.get("/api/products", productController.getAll)
router.put("/api/products/:product_id", verifyToken, isOwner, productController.update)
router.delete("/api/products/:product_id", verifyToken, isOwner, productController.delete)

export default router