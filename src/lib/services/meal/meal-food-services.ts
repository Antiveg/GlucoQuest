import { getUserMealsWithFoodsByUserIdQuery } from "@/lib/data-layers/meal";

export async function getUserMealsWithFoodsByUserIdService(uid : string, date : string, timezoneOffsetMinutes : number){
    try {
        const userId = Number(uid)
        if (isNaN(userId)) throw new Error("Invalid user id queried.");

        const MealsWithFoods = await getUserMealsWithFoodsByUserIdQuery(userId, new Date(date), timezoneOffsetMinutes);
        if (!MealsWithFoods) throw new Error("Failed to query user's glucose reading to database ...");
        const flattenedMeals = MealsWithFoods.map((meal) => ({
            ...meal,
            createdAt: meal.createdAt.toISOString(),
            time: meal.time.toISOString(),
            foods: meal.mealFoods.map((mf) => ({
                ...mf.food,
                createdAt: mf.food.createdAt.toISOString(),
                servings: mf.servings,
            })),
        }));
        console.log(flattenedMeals);
        return flattenedMeals
    } catch (error: unknown) {
        if(error instanceof Error){
            console.error(error);
            throw new Error(error.message);
        }
        console.error(error);
        throw new Error("Internal Server Error");
    }
}