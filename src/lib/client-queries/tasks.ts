import { Task } from "@/types";
import { CreateTask } from "@/types/task";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// get user daily tasks by userId
async function fetchDailyTasksByUserId(date: string) {
  const offset = -new Date().getTimezoneOffset();
  const res = await fetch(`/api/user/daily-tasks?date=${date}&offset=${offset}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to fetch the intended daily tasks");
  return res.json();
}

export function useDailyTasksByUserId(date: string) {
  return useQuery<Task[], Error>({
    queryKey: ["user-daily-tasks", date],
    queryFn: () => fetchDailyTasksByUserId(date),
  });
}

// update task completion (the done attribute in Task entity)
async function updateTaskCompletionStatus({ taskId, toggle } : { taskId: number, toggle: boolean }) {
  const res = await fetch(`/api/user/daily-tasks/${taskId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ done: toggle }),
  });
  if (!res.ok) throw new Error("Failed to update task completion status");
  return res.json();
}

export function useUpdateTaskCompletionStatus(date : string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTaskCompletionStatus,
    onMutate: async ({ taskId, toggle }) => {
      await queryClient.cancelQueries({ queryKey: ["user-daily-tasks", date] });
      const previousTasks = queryClient.getQueryData<Task[]>(["user-daily-tasks", date]);
      queryClient.setQueryData(
        ["user-daily-tasks", date],
        previousTasks?.map((task) => task.id === taskId ? { ...task, done: toggle } : task)
      );
      return { previousTasks };
    },
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(["user-daily-tasks", date], (oldData: Task[] | undefined) => {
        return oldData?.map((task) => task.id === updatedTask.id ? { ...task, done: updatedTask.done } : task);
      });
      toast.success(`Task marked as ${updatedTask.done ? "completed" : "incomplete"}.`)
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(["user-daily-tasks", date], context?.previousTasks);
      toast.error("Failed to update task status. Please try again.");

      if(process.env.NODE_ENV === "development") console.log(`${error.message}${variables.toggle}`)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user-daily-tasks", date] });
    },
  });
}

// delete task by id (the done attribute in Task entity)
async function deleteTaskById(taskId : number) {
  const res = await fetch(`/api/user/daily-tasks/${taskId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  });
  if (!res.ok) throw new Error("Failed to update task completion status");
  return res.json();
}

export function useDeleteTaskById(date: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTaskById,
    onSuccess: (deletedTask) => {
      queryClient.setQueryData<Task[]>(["user-daily-tasks", date], (oldData) => {
        return oldData?.filter((task) => task.id !== deletedTask.id);
      });
      const truncatedTaskName =
        deletedTask.task.length > 23
          ? deletedTask.task.slice(0, 20) + "..."
          : deletedTask.task;
      toast.success(`Task "${truncatedTaskName}" successfully deleted.`)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  });
}

// Create new user task
async function createUserTask(task: CreateTask) {
  const res = await fetch(`/api/user/daily-tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (!res.ok) throw new Error("Failed to create new user task");
  return res.json();
}

export function useCreateUserTask(date : string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUserTask,
    onSuccess: (createdTask) => {
      queryClient.invalidateQueries({ queryKey: ["user-daily-tasks", date] });
      toast.success(`Task "${createdTask.title}" created successfully!`);
    },
    onError: (error) => {
      toast.error(error.message)
    },
  });
}