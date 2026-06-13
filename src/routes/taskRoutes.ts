import { Router } from "express"
import { authMiddleware } from "../middlewares/authMiddleware"

import {
  createTask,
  listTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController"

const router = Router()

// todas as rotas de task precisam de login
router.use(authMiddleware)

// CREATE
router.post("/", createTask)

// LIST (do usuário logado)
router.get("/", listTasks)

// GET ONE
router.get("/:id", getTaskById)

// UPDATE
router.put("/:id", updateTask)

// DELETE
router.delete("/:id", deleteTask)

export default router