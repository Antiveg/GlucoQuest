import { CgmDevice } from "@/database/prisma-client";
import { createCGMDeviceQuery, getCGMDeviceByUserIdQuery } from "@/lib/data-layers/cgm";

export async function getCGMDeviceByUserIdService(uid : string){
    try {
        const userId = Number(uid)
        if (isNaN(userId)) throw new Error("Invalid user id queried.");

        const CGMDevice = await getCGMDeviceByUserIdQuery(userId);
        if (!CGMDevice) throw new Error("Failed to query user's cgm device to database ...");
        const formattedDevices = CGMDevice.map((device) => ({
            ...device,
            connectedAt: device.connectedAt.toISOString(),
            lastSyncAt: device.lastSyncAt?.toISOString()
        }))
        // console.log(formattedDevices)
        return formattedDevices;
    } catch (error: unknown) {
        if(error instanceof Error){
            console.error(error);
            throw new Error(error.message);
        }
        console.error(error);
        throw new Error("Internal Server Error");
    }
}

export async function createUserCGMDeviceService(device: CgmDevice) {
    try {
        if (!device.userId) throw new Error("User ID is required.");
        if (device.deviceId.length <= 0) throw new Error("Please enter a valid device id.");
        if (!device.connectedAt) throw new Error("First connection time is required.");

        const userId = device.userId
        const input = {
            ...device,
            userId: undefined,
            user : { connect: { id: userId }},
        }
        const createdDevice = await createCGMDeviceQuery(input);

        return createdDevice;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error creating user cgm device:", error.message);
            throw new Error(error.message);
        }
        console.error(error);
        throw new Error("Internal Server Error");
    }
}