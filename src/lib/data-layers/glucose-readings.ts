import { Prisma } from "@/database/prisma-client"
import prisma from "../config/prisma"

export const getGlucoseReadingsByUserIdQuery = async (userId : number) => {
    const temp = await prisma.glucoseReading.findMany({
        where: { userId: userId },
        orderBy : { time: 'asc' },
        select: {
            id: true,
            userId: true,
            time: true,
            glucose: true,
            tag: true,
            createdAt: true,
            notes: true
        },
    })
    // console.log(temp)
    return temp
}

export const deleteGlucoseReadingByIdQuery = async (id: number, userId : number) => {
    const deletedRecord = await prisma.glucoseReading.delete({
        where: { id: id, userId: userId },
    });
    return deletedRecord;
}

export const getGlucoseReadingByIdQuery = async (id: number) => {
    const record = await prisma.glucoseReading.findFirst({
        where: { id: id },
    })
    return record
}

export const createGlucoseReadingQuery = async (data : Prisma.GlucoseReadingCreateInput) => {
    const createdRecord = await prisma.glucoseReading.create({data})
    return createdRecord;
}