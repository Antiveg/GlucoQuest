import { Prisma } from "@/database/prisma-client";
import prisma from "../config/prisma"

export const getDailyTasksByUserIdQuery = async (userId : number, date : Date, timezoneOffsetMinutes: number) => {
    const startOfDayUTC = new Date(date.getTime() - timezoneOffsetMinutes * 60 * 1000);
    const endOfDayUTC = new Date(startOfDayUTC.getTime() + 24 * 60 * 60 * 1000);
    const temp = await prisma.task.findMany({
        where: { 
            userId: userId,
            deadline: {
                gte: startOfDayUTC,
                lt: endOfDayUTC,
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

export const createUserTaskQuery = async (data: Prisma.TaskCreateInput) => {
    const createdRecord = await prisma.task.create({data})
    return createdRecord;
}