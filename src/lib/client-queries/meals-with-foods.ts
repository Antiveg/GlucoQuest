import { MealWithFood, MealWithoutFoodDetailsInput } from "@/types/meal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "sonner";

// get user glucose readings by userid
async function fetchUserMealsWithFoodsByUserId(date: string, offset: number) {
  const res = await fetch(`/api/user/meals?date=${date}&offset=${offset}`);
  if (!res.ok) throw new Error("Failed to fetch user meals with foods");
  return res.json();
}

export function useUserMealsWithFoodsByUserId(date: string) {
  const offset = -new Date().getTimezoneOffset();
  return useQuery<MealWithFood[], Error>({
    queryKey: ["user-meals-with-foods", date],
    queryFn: () => fetchUserMealsWithFoodsByUserId(date, offset),
  });
}

// create meal with foods (+ 1 photoUrl)
async function createMealWithFoods(mealPayload : MealWithoutFoodDetailsInput) {
  const res = await fetch(`/api/user/meals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mealPayload),
  });
  if (!res.ok) throw new Error("Failed to create meal with foods");
  return res.json();
}

export function useCreateMealWithFoods() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMealWithFoods,
    onSuccess: (newMeal) => {
      queryClient.invalidateQueries({ queryKey: ["user-meals-with-foods"] });
      toast.success(`Meal Record on ${format(new Date(newMeal.time), "dd/MM/yyyy HH:mm")} created.`)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  });
}

async function fetchTotalCarbsByUserId() {
  const res = await fetch(`/api/user/meals/total-carbs`);
  if (!res.ok) throw new Error("Failed to fetch user meals with foods");
  return res.json();
}

export function useFetchTotalCarbsByUserId() {
  return useQuery<number, Error>({
    queryKey: ["user-total-carbs"],
    queryFn: () => fetchTotalCarbsByUserId(),
  });
}