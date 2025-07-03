import { getUserMealsWithFoodsByUserIdQuery } from "@/lib/data-layers/meal";

export async function getUserMealsWithFoodsByUserIdService(uid : string, date : string, timezoneOffsetMinutes : number){
    try {
        const userId = Number(uid)
        if (isNaN(userId)) throw new Error("Invalid user id queried.");

        const MealsWithFoods = await getUserMealsWithFoodsByUserIdQuery(userId, new Date(date), timezoneOffsetMinutes);
        if (!MealsWithFoods) throw new Error("Failed to query user's glucose reading to database ...");
        const formattedMealsWithFoods = MealsWithFoods.map((meal) => {
            const foods = meal.foods.map((food) => ({
                ...food,
                createdAt: food.createdAt.toISOString()
            }))
            return {
                ...meal,
                time: meal.time.toISOString(),
                createdAt: meal.createdAt.toISOString(),
                foods: foods
            }
        })
        // console.log(formattedMealsWithFoods)
        return formattedMealsWithFoods;
    } catch (error: unknown) {
        if(error instanceof Error){
            console.error(error);
            throw new Error(error.message);
        }
        console.error(error);
        throw new Error("Internal Server Error");
    }
}