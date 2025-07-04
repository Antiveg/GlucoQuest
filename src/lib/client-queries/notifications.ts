import { Notification } from "@/types";
import { useQuery } from "@tanstack/react-query";

async function fetchRecentNotificationsByUserId() {
  const res = await fetch("/api/user/notifications");
  if (!res.ok) throw new Error("Failed to fetch user notifications");
  return res.json();
}

export function useRecentNotificationsByUserId() {
  return useQuery<Notification[], Error>({
    queryKey: ["user-notifications"],
    queryFn: fetchRecentNotificationsByUserId,
  });
}
