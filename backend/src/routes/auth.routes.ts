import { Router } from "express";
import {
  register,
  login,
  logout,
  verifyUser,
  getMe,
} from "../controllers/auth.controller";
import authMiddleware from "../middleware/auth.middleware";
import validate from "../middleware/validate.middleware";
import { registerSchema, loginSchema } from "../validation/auth.validation";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", authMiddleware, logout);
router.get("/verify", authMiddleware, verifyUser);
router.get("/me", authMiddleware, getMe);

export default router;
