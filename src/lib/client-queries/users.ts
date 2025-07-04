import { Prisma } from "@/database/prisma-client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
  if (!res.ok) throw new Error("Failed to create new user");
  return res.json();
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("New user successfully created!")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  });
}

// fetch authenticated user
async function getUserById() {
  const res = await fetch("/api/user");
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export function useGetUserById() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUserById,
  });
}

// update authenticated user
async function updateUser(user: Prisma.UserUpdateInput) {
  const res = await fetch("/api/user", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success(`User #${updatedUser.id} successfully updated!`)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  });
}