import prisma from "../config/prisma"

export const getDailyTasksByUserIdQuery = async (userId : number, date : Date) => {
    const startOfDay = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const endOfDay = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1));
    const temp = await prisma.task.findMany({
        where: { 
            userId: userId,
            deadline: {
                gte: startOfDay,
                lt: endOfDay,
            },
        },
        orderBy : { deadline: 'asc' },
    })
    return temp
}