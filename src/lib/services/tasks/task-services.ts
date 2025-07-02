import { Task } from "@/database/prisma-client";
import { getDailyTasksByUserIdQuery } from "@/lib/data-layers/tasks";

export async function getDailyTasksByUserIdService(uid : string, date : string){
    try {
        const userId = Number(uid)
        if (isNaN(userId)) throw new Error("Invalid user id queried.");

        const Tasks = await getDailyTasksByUserIdQuery(userId, new Date(date));
        if (!Tasks) throw new Error("Failed to query user's tasks reading to database ...");
        const formattedTasks = Tasks.map((task : Task) => ({
            ...task,
            deadline: task?.deadline?.toISOString() ?? null,
            createdAt: task.createdAt.toISOString()
        }))
        // console.log("1", formattedTasks)
        return formattedTasks;
    } catch (error: unknown) {
        if(error instanceof Error){
            console.error(error);
            throw new Error(error.message);
        }
        console.error(error);
        throw new Error("Internal Server Error");
    }
}