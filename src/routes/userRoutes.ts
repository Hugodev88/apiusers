import { Router } from "express";
import { me, getUsers } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", getUsers);
router.get("/me", authMiddleware, me);

export default router;