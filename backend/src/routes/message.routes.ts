import { Router } from "express";
import {
  sendMessage,
  getMessages,
  getCounts,
} from "../controllers/message.controller";
import authMiddleware from "../middleware/auth.middleware";
import validate from "../middleware/validate.middleware";
import { messageSchema } from "../validation/message.validation";

const router = Router();

router.post("/", authMiddleware, validate(messageSchema), sendMessage);
router.get("/", authMiddleware, getMessages);
router.get("/counts", authMiddleware, getCounts);

export default router;
