import { prisma } from "../config/prisma";

export const getUsers = async (req: any, res: any) => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true, 
            email: true
        }
    });
    return res.json(users)
}

export const me = async (req: any, res: any) => {
    const userId = req.auth.userId;
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }, 
        select: {
            id: true,
            name: true, 
            email: true
        }
    })
    return res.json(user);
};