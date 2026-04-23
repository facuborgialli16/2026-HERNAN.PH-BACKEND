import express from "express";
import AuthController from "../controllers/auth.controller.js";

const router = express.Router();

// Registro y login
router.post("/api/auth/register", AuthController.register);
router.post("/api/auth/login", AuthController.login);

// ✅ Verificación de email
router.get("/api/auth/verify/:token", AuthController.verifyEmail);

export default router;