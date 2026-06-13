import { TaskRepository } from "../repositories/taskRepository"

const repo = new TaskRepository()

export const createTask = async (req: any, res: any) => {
  const userId = req.auth?.userId

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const { title } = req.body

  const task = await repo.create({
    title,
    userId,
  })

  return res.status(201).json(task)
}

export const listTasks = async (req: any, res: any) => {
  const userId = req.auth?.userId
  console.log(userId)

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const tasks = await repo.findByUser(userId)

  return res.json(tasks)
}

export const getTaskById = async (req: any, res: any) => {
  const userId = req.auth?.userId
  const taskId = Number(req.params.id)

  const task = await repo.findById(taskId)

  if (!task) {
    return res.status(404).json({ message: "Task not found" })
  }

  if (task.userId !== userId) {
    return res.status(403).json({ message: "Forbidden" })
  }

  return res.json(task)
}

export const updateTask = async (req: any, res: any) => {
  const userId = req.auth?.userId
  const taskId = Number(req.params.id)

  const task = await repo.findById(taskId)

  if (!task) {
    return res.status(404).json({ message: "Task not found" })
  }

  if (task.userId !== userId) {
    return res.status(403).json({ message: "Forbidden" })
  }

  const updated = await repo.update(taskId, req.body)

  return res.json(updated)
}

export const deleteTask = async (req: any, res: any) => {
  const userId = req.auth?.userId
  const taskId = Number(req.params.id)

  const task = await repo.findById(taskId)

  if (!task) {
    return res.status(404).json({ message: "Task not found" })
  }

  if (task.userId !== userId) {
    return res.status(403).json({ message: "Forbidden" })
  }

  await repo.delete(taskId)

  return res.sendStatus(204)
}