import { Prisma } from "@/database/prisma-client";
import { createMealWithFoodsQuery, getTotalCarbsByUserIdQuery, getUserMealsWithFoodsByUserIdQuery } from "@/lib/data-layers/meal";

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
            mealFoods: meal.mealFoods.map((mf) => ({
                ...mf.food,
                createdAt: mf.food.createdAt.toISOString(),
                servings: mf.servings,
            })),
        }));
        // console.log(flattenedMeals)
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

type CreateMealPayload = Omit<Prisma.MealCreateInput, "mealFoods" | "user"> & {
  mealFoods: { foodId: number; servings: number }[];
};

export async function createMealWithFoodsService(uid : string, payload : CreateMealPayload) {
    try {
        const userId = Number(uid)
        if (isNaN(userId)) throw new Error("Invalid user id queried.");

        const { mealFoods, ...meal } = payload;
        const input : Prisma.MealCreateInput = {
            ...meal,
            user: { connect: { id: userId } },
            mealFoods: {
                create: mealFoods?.map((mf) => ({
                    servings: mf.servings,
                    food: { connect: { id: mf.foodId } },
                })),
            },
        };
        const createdMealWithFoods = await createMealWithFoodsQuery(input);
        return createdMealWithFoods
    } catch (error: unknown) {
        if(error instanceof Error){
            console.error(error);
            throw new Error(error.message);
        }
        console.error(error);
        throw new Error("Internal Server Error");
    }
}

export async function getTotalCarbsByUserIdService(uid : string){
    try {
        const userId = Number(uid)
        if (isNaN(userId)) throw new Error("Invalid user id queried.");

        const temp = await getTotalCarbsByUserIdQuery(userId);
        if (!temp) throw new Error("Failed to query user's carbs");
        return temp;
    } catch (error: unknown) {
        if(error instanceof Error){
            console.error(error);
            throw new Error(error.message);
        }
        console.error(error);
        throw new Error("Internal Server Error");
    }
}