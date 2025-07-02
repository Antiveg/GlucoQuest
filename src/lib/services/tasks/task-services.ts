import { Task } from "@/database/prisma-client";
import { deleteTaskByIdQuery, getDailyTasksByUserIdQuery, updateTaskCompletionStatusQuery } from "@/lib/data-layers/tasks";

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

export async function updateTaskCompletionStatusService(taskId: string, toggle: boolean) {
  try {
    const taskIdNum = Number(taskId);
    if (isNaN(taskIdNum)) throw new Error("Invalid task ID");

    const updatedTask = await updateTaskCompletionStatusQuery(taskIdNum, toggle);
    return updatedTask;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(error.message);
    }
    console.error(error);
    throw new Error("Internal Server Error");
  }
}

export async function deleteTaskByIdService(userId: string, taskId: string) {
    try {
      const taskIdNum = Number(taskId);
      const userIdNum = Number(userId);
      if (isNaN(taskIdNum)) throw new Error("Invalid task ID");

      const deletedReading = await deleteTaskByIdQuery(userIdNum, taskIdNum);
      if (!deletedReading) throw new Error("Failed to delete user's daily task.");
      
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