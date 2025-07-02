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

export const updateTaskCompletionStatusQuery = async (taskId: number, toggle: boolean) => {
    return await prisma.task.update({
        where: { id: taskId },
        data: { done: toggle },
    });
};

export const deleteTaskByIdQuery = async (userId: number, taskId: number) => {
    const deletedRecord = await prisma.task.delete({
        where: { 
            id: taskId,
            userId: userId
        },
    });
    return deletedRecord;
}