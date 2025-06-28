import prisma from "../config/prisma"

export const queryGlucoseReadingsByUserId = async (userId : number) => {
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