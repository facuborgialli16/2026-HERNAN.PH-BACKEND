import express from "express"
import eventController from "../controllers/event.controller.js"
import { verifyToken, isOwner } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/api/events", verifyToken, isOwner, eventController.create)

router.get("/api/events", eventController.getEvents)

router.get("/api/events/:event_id", eventController.getById)

router.get("/api/events/code/:code", eventController.getByCode)
router.delete("/api/events/:event_id", verifyToken, isOwner, eventController.delete)

export default router