import { GlucoseReadingInput, GlucoseReading } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "sonner";

// get user glucose readings by userid
async function fetchGlucoseReadingsByUserId(date: string, offset: number) {
  const res = await fetch(`/api/user/glucose-readings?date=${date}&offset=${offset}`);
  if (!res.ok) throw new Error("Failed to fetch the intended glucose readings");
  return res.json();
}

export function useGlucoseReadingsByUserId(date: string) {
  const offset = -new Date().getTimezoneOffset();
  return useQuery<GlucoseReading[], Error>({
    queryKey: ["user-glucose-readings", date],
    queryFn: () => fetchGlucoseReadingsByUserId(date, offset),
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

export function useDeleteUserGlucoseReadingById(date : string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUserGlucoseReadingById,
    onSuccess: (deletedRecord) => {
      queryClient.setQueryData<GlucoseReading[]>(
        ["user-glucose-readings", date],
        (oldData) => oldData ? oldData.filter(r => r.id !== deletedRecord.id) : []
      );
      toast.success(`Glucose Reading on ${format(new Date(deletedRecord.time),"dd-MM-yyyy HH:mm")} deleted.`)
    },
    onError: (error) => {
      toast.error(error.message)
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

export function useCreateGlucoseReading(date : string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGlucoseReading,
    onSuccess: (newRecord) => {
      queryClient.setQueryData<GlucoseReading[]>(
        ["user-glucose-readings", date],
        (oldData) => oldData ? [newRecord, ...oldData] : [newRecord]
      );
      toast.success(`Glucose Reading on ${format(new Date(newRecord.time),"dd/MM/yyyy HH:mm")} created.`)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  });
}

async function fetchMostRecentGlucoseReadingByUserId() {
  const res = await fetch(`/api/user/glucose-readings/recent`);
  if (!res.ok) throw new Error("Failed to fetch the intended glucose readings");
  return res.json();
}

export function useMostRecentGlucoseReadingByUserId() {
  return useQuery<GlucoseReading, Error>({
    queryKey: ["user-glucose-readings-recent"],
    queryFn: () => fetchMostRecentGlucoseReadingByUserId(),
  });
}