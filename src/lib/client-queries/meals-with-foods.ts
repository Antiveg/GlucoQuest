import { MealWithFood } from "@/types/meal";
import { useQuery } from "@tanstack/react-query";

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