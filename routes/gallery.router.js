import express from "express"
import galleryController from "../controllers/gallery.controller.js"
import { verifyToken, isOwner } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/api/events/:event_id/galleries", verifyToken, isOwner, galleryController.create)
router.get("/api/events/:event_id/galleries", galleryController.getByEvent)
router.get("/api/galleries/:gallery_id", galleryController.getById)
router.put("/api/galleries/:gallery_id", verifyToken, isOwner, galleryController.update)
router.delete("/api/galleries/:gallery_id", verifyToken, isOwner, galleryController.delete)

export default router