import { Task } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// get user daily tasks by userId
async function fetchDailyTasksByUserId(date: string) {
  const res = await fetch(`/api/user/daily-tasks?date=${date}`, {
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
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(["user-daily-tasks", date], context?.previousTasks);
      console.error(`${variables?.toggle ?? true} Error updating task completion status:`, error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user-daily-tasks", date] });
    },
  });
}
