import { Food } from "@/types";
import { FoodInput } from "@/types/meal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// get user's foods information
async function getUserFoods() {
  const res = await fetch("/api/user/foods");
  if (!res.ok) throw new Error("Failed to fetch user meals with foods");
  return res.json();
}

export function useGetUserFoods() {
  return useQuery<Food[], Error>({
    queryKey: ["user-foods"],
    queryFn: getUserFoods,
  });
}

// delete user's food
async function deleteUserFood(fid : number) {
  const res = await fetch("/api/user/foods", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fid }),
  });
  if (!res.ok) throw new Error("Failed to delete user food");
  return res.json();
}

export function useDeleteUserFood() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUserFood,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-foods"] });
    },
    onError: (error) => {
      console.error("Error deleting user food:", error);
    },
  });
}

// create user's food
async function createUserFood(food : FoodInput) {
  const res = await fetch("/api/user/foods", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ food }),
  });
  if (!res.ok) throw new Error("Failed to create user food");
  return res.json();
}

export function useCreateUserFood() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUserFood,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-foods"] });
    },
    onError: (error) => {
      console.error("Error creating user food:", error);
    },
  });
}