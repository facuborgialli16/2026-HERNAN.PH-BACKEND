import express from "express"
import galleryController from "../controllers/gallery.controller.js"
import { verifyToken, isOwner } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/events/:event_id/galleries", verifyToken, isOwner, galleryController.create)
router.get("/events/:event_id/galleries", galleryController.getByEvent)
router.get("/galleries/:gallery_id", galleryController.getById)
router.put("/galleries/:gallery_id", verifyToken, isOwner, galleryController.update)
router.delete("/galleries/:gallery_id", verifyToken, isOwner, galleryController.delete)

export default router