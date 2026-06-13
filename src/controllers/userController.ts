import { UserRepository } from "../repositories/userRepository"

const repo = new UserRepository()

export const listUsers = async (req: any, res: any) => {
  const users = await repo.findAll()
  return res.json(users)
}

export const me = async (req: any, res: any) => {
  const userId = req.auth?.userId

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const user = await repo.findById(userId)

  return res.json(user)
}

export const getUserById = async (req: any, res: any) => {
  const { id } = req.params

  const user = await repo.findById(id)

  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  return res.json(user)
}