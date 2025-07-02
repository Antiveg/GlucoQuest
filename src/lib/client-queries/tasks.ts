import { Task } from "@/types";
import { useQuery } from "@tanstack/react-query";

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
