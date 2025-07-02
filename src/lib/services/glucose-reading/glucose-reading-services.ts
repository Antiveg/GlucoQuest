import { GlucoseReading, Prisma } from "@/database/prisma-client";
import { deleteGlucoseReadingByIdQuery, getGlucoseReadingsByUserIdQuery , getGlucoseReadingByIdQuery, createGlucoseReadingQuery } from "@/lib/data-layers/glucose-readings";

export async function getGlucoseReadingsByUserIdService(uid : string){
    try {
        const userId = Number(uid)
        if (isNaN(userId)) throw new Error("Invalid user id queried.");

        const glucoseReadings = await getGlucoseReadingsByUserIdQuery(userId);
        if (!glucoseReadings) throw new Error("Failed to query user's glucose reading to database ...");
        const formattedReadings = glucoseReadings.map((reading) => ({
            ...reading,
            time: reading.time.toISOString(),
            createdAt: reading.createdAt.toISOString()
        }))
        // console.log(formattedReadings)
        return formattedReadings;
    } catch (error: unknown) {
        if(error instanceof Error){
            console.error(error);
            throw new Error(error.message);
        }
        console.error(error);
        throw new Error("Internal Server Error");
    }
}

export async function deleteGlucoseReadingByIdService(id: number, userId: number) {
    try {
        const deletedReading = await deleteGlucoseReadingByIdQuery(id, userId);
        if (!deletedReading) throw new Error("Failed to delete glucose reading.");

        return deletedReading
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error);
            throw new Error(error.message);
        }
        console.error(error);
        throw new Error("Internal Server Error");
    }
}

export async function createGlucoseReadingService(reading: GlucoseReading) {
    try {
        if (!reading.userId) throw new Error("User ID is required.");
        if (reading.glucose <= 0) throw new Error("Please enter a valid glucose value.");
        if (!reading.time) throw new Error("Time is required.");

        const userId = reading.userId
        const input = {
            ...reading,
            userId: undefined,
            user : { connect: { id: userId }},
        }
        const createdReading = await createGlucoseReadingQuery(input);

        return createdReading;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error creating glucose reading:", error.message);
            throw new Error(error.message);
        }
        console.error(error);
        throw new Error("Internal Server Error");
    }
}