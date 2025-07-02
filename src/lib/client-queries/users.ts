import { Prisma } from "@/database/prisma-client";
import { GlucoseReading } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// get all users query
async function fetchUsers() {
  const res = await fetch("/api/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
}

// create new user query mutation
async function createUser(user : Prisma.UserCreateInput) {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Failed to create user");
  return res.json();
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

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
  const res = await fetch(`/api/user/glucose-readings/${id}`, {
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