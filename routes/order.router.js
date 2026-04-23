import express from "express"
import orderController from "../controllers/order.controller.js"

const router = express.Router()

router.post("/api/events/:event_id/orders", orderController.create)

router.get("/api/orders/event/:event_id", orderController.getByEv)

export default router