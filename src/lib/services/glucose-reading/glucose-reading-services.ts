import { deleteGlucoseReadingById, queryGlucoseReadingsByUserId, getGlucoseReadingById } from "@/lib/data-layers/glucose-readings";

export async function getGlucoseReadingsByUserIdService(uid : string){

    const userId = Number(uid)
    if (typeof userId !== 'number' || isNaN(userId)) throw new Error("Invalid user id queried.");

    try {
        const glucoseReadings = await queryGlucoseReadingsByUserId(userId);
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

        const deletedReading = await deleteGlucoseReadingById(id, userId);
        if (!deletedReading) throw new Error("Failed to delete glucose reading.");

        return { message: "Glucose reading deleted successfully.", deletedReading };
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error);
            throw new Error(error.message);
        }
        console.error(error);
        throw new Error("Internal Server Error");
    }
}