import { Prisma } from "@/database/prisma-client";
import prisma from "../config/prisma";

export const getCGMDeviceByUserIdQuery = async (userId : number) => {
    const temp = await prisma.cgmDevice.findMany({
        where: { userId: userId },
    })
    return temp
}

export const createCGMDeviceQuery = async (data : Prisma.CgmDeviceCreateInput) => {
    const createdDevice = await prisma.cgmDevice.create({ data })
    return createdDevice
}