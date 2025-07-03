import { Prisma } from "@/database/prisma-client";
import prisma from "../config/prisma";

export const getCGMDeviceByUserIdQuery = async (userId : number) => {
    const temp = await prisma.cgmDevice.findMany({
        where: { userId: userId },
        orderBy: { isConnected: 'desc' }
    })
    return temp
}

export const createCGMDeviceQuery = async (data : Prisma.CgmDeviceCreateInput) => {
    const createdDevice = await prisma.cgmDevice.create({ data })
    return createdDevice
}

export const updateCGMDeviceConnectionStatusQuery = async (did : number, uid : number, lastSyncAt : Date, isConnected : boolean) => {
    const existingDevice = await prisma.cgmDevice.findFirst({
        where: {
            id: did,
            userId: uid,
        },
    });
    if (!existingDevice) throw new Error("No device with the associated id and user id exists in the database.")

    const updatedDevice = await prisma.cgmDevice.update({
        where: { id: did },
        data: {
            lastSyncAt,
            isConnected,
        },
    });
    return updatedDevice;
};

export const disconnectCGMDevicesConnectionByUserIdQuery = async (uid : number) => {
    const updatedDevices = await prisma.cgmDevice.updateMany({
        where: { 
            userId: uid,
            isConnected: true,
        },
        data: {
            isConnected: false,
        },
    });
    return updatedDevices;
}

export const updateCGMDeviceLastSyncQuery = async (did : number, uid : number, lastSyncAt : Date) => {
    const existingDevice = await prisma.cgmDevice.findFirst({
        where: {
            id: did,
            userId: uid,
        },
    });
    if (!existingDevice) throw new Error("No device with the associated id and user id exists in the database.")

    const updatedDevice = await prisma.cgmDevice.update({
        where: { id: did },
        data: {
            lastSyncAt,
        },
    });
    return updatedDevice;
};

export const deleteUserCGMDeviceQuery = async (did : number, uid : number) => {
    const deletedDevice = await prisma.cgmDevice.delete({
        where: { id: did, userId: uid },
    });
    return deletedDevice;
};