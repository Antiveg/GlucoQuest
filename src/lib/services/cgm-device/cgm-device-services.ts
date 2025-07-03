import { CgmDevice } from "@/database/prisma-client";
import { createCGMDeviceQuery, deleteUserCGMDeviceQuery, disconnectCGMDevicesConnectionByUserIdQuery, getCGMDeviceByUserIdQuery, updateCGMDeviceConnectionStatusQuery, updateCGMDeviceLastSyncQuery } from "@/lib/data-layers/cgm";

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

        const disconnectedDevices = await disconnectCGMDevicesConnectionByUserIdQuery(Number(device.userId))
        if(disconnectedDevices.count > 1) console.log("There is data anomaly where user has 2 connected devices...")

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

export async function updateCGMDeviceConnectionStatusService(did : string, uid: string, lastSyncAt : string, isConnected : boolean){
    try {
        if (!did) throw new Error("Device ID is required.");
        if (!uid) throw new Error("User ID is required.");
        if (!lastSyncAt) throw new Error("The current syncing time is required.");
        if (isConnected === undefined) throw new Error("Device connection status is required.");

        if(isConnected){ // kalau mau connect device lain, semua device harus off dlu mastiin cuma 1 yg nyala
            const disconnectedDevices = await disconnectCGMDevicesConnectionByUserIdQuery(Number(uid))
            if(disconnectedDevices.count > 1) console.log("There is data anomaly where user has 2 connected devices...")
        }
        const updatedDevice = await updateCGMDeviceConnectionStatusQuery(Number(did), Number(uid), new Date(lastSyncAt), isConnected)

        return updatedDevice;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error creating user cgm device:", error.message);
            throw new Error(error.message);
        }
        console.error(error);
        throw new Error("Internal Server Error");
    }
}

export async function updateCGMDeviceLastSyncService(did : string, uid: string, lastSyncAt : string, isConnected : boolean){
    try {
        if (!did) throw new Error("Device ID is required.");
        if (!uid) throw new Error("User ID is required.");
        if (!lastSyncAt) throw new Error("The current syncing time is required.");
        if (isConnected === undefined) throw new Error("Device Connection Status is required.")
        if (!isConnected) throw new Error("To sync, the device must be turned on first...");

        const updatedDevice = await updateCGMDeviceLastSyncQuery(Number(did), Number(uid), new Date(lastSyncAt))
        return updatedDevice;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error creating user cgm device:", error.message);
            throw new Error(error.message);
        }
        console.error(error);
        throw new Error("Internal Server Error");
    }
}

export async function deleteUserCGMDeviceService(did : string, uid: string){
    try {
        if (!did) throw new Error("Device ID is required.");
        if (!uid) throw new Error("User ID is required.");

        const deletedDevice = await deleteUserCGMDeviceQuery(Number(did), Number(uid))
        return deletedDevice;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error creating user cgm device:", error.message);
            throw new Error(error.message);
        }
        console.error(error);
        throw new Error("Internal Server Error");
    }
}