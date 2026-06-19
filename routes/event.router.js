import express from "express"
import eventController from "../controllers/event.controller.js"
import { verifyToken, isOwner } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/events", verifyToken, isOwner, eventController.create)

router.get("/events", eventController.getEvents)

router.get("/events/:event_id", eventController.getById)

router.get("/events/code/:code", eventController.getByCode)
router.delete("/events/:event_id", verifyToken, isOwner, eventController.delete)

export default router