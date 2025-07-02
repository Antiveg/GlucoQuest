import { GlucoseReadingInput, GlucoseReading } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// get user glucose readings by userid
async function fetchGlucoseReadingsByUserId() {
  const res = await fetch("/api/user/glucose-readings");
  if (!res.ok) throw new Error("Failed to fetch the intended glucose readings");
  return res.json();
}

export function useGlucoseReadingsByUserId() {
  return useQuery<GlucoseReading[], Error>({
    queryKey: ["user-glucose-readings"],
    queryFn: fetchGlucoseReadingsByUserId,
  });
}

// delete a user's glucose reading log record
async function deleteUserGlucoseReadingById(id: number) {
  const res = await fetch(`/api/user/glucose-readings`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error("Failed to delete glucose reading");
  return res.json();
}

export function useDeleteUserGlucoseReadingById() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserGlucoseReadingById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-glucose-readings"] });
    },
    onError: (error) => {
      console.error("Error deleting glucose reading:", error);
    },
  });
}

// Create new glucose reading log record
async function createGlucoseReading(record: GlucoseReadingInput) {
  const res = await fetch(`/api/user/glucose-readings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(record),
  });

  if (!res.ok) throw new Error("Failed to create glucose reading");
  return res.json();
}

export function useCreateGlucoseReading() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGlucoseReading,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-glucose-readings"] });
    },
    onError: (error) => {
      console.error("Error creating glucose reading:", error);
    },
  });
}
