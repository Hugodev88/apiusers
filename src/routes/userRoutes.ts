import { Router } from "express";
import { listUsers, me } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", listUsers);
router.get("/me", authMiddleware, me);

export default router;