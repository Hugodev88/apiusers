import { prisma } from "../config/prisma"

export class TaskRepository {
  async create(data: {
    title: string
    userId: string
  }) {
    return prisma.task.create({
      data: {
        title: data.title,
        done: false,
        userId: data.userId,
      },
    })
  }

  async findByUser(userId: string) {
    return prisma.task.findMany({
      where: { userId },
      orderBy: { id: "desc" },
    })
  }

  async findById(taskId: number) {
    return prisma.task.findUnique({
      where: { id: taskId },
    })
  }

  async update(taskId: number, data: {
    title?: string
    done?: boolean
  }) {
    return prisma.task.update({
      where: { id: taskId },
      data,
    })
  }

  async delete(taskId: number) {
    return prisma.task.delete({
      where: { id: taskId },
    })
  }

  async deleteAllByUser(userId: string) {
    return prisma.task.deleteMany({
      where: { userId },
    })
  }
}