import { Task } from "@/database/prisma-client";
import { createUserTaskQuery, deleteTaskByIdQuery, getDailyTasksByUserIdQuery, updateTaskCompletionStatusQuery } from "@/lib/data-layers/tasks";

export async function getDailyTasksByUserIdService(uid : string, date : string, timezoneOffsetMinutes: number){
    try {
        const userId = Number(uid)
        if (isNaN(userId)) throw new Error("Invalid user id queried.");
        const Tasks = await getDailyTasksByUserIdQuery(userId, new Date(date), timezoneOffsetMinutes);
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

      const deletedTask = await deleteTaskByIdQuery(userIdNum, taskIdNum);
      if (!deletedTask) throw new Error("Failed to delete user's daily task.");
      
      return deletedTask
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        throw new Error(error.message);
      }
      console.error(error);
      throw new Error("Internal Server Error");
    }
}

export async function createUserTaskService(Task: Task) {
    try {
        if (!Task.userId) throw new Error("User ID is required.");
        if (Task.task.length <= 0) throw new Error("Please enter a valid task name.");

        const userId = Task.userId
        const input = {
            ...Task,
            userId: undefined,
            deadline: Task.deadline ?? null,
            user : { connect: { id: userId }},
        }
        const createdTask = await createUserTaskQuery(input);

        return createdTask;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error creating user task:", error.message);
            throw new Error(error.message);
        }
        console.error(error);
        throw new Error("Internal Server Error");
    }
}