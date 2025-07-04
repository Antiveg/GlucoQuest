import { Prisma } from "@/database/prisma-client";
import prisma from "../config/prisma";

export const getUserMealsWithFoodsByUserIdQuery = async (userId : number, date : Date, timezoneOffsetMinutes : number) => {
    const startOfDayUTC = new Date(date.getTime() - timezoneOffsetMinutes * 60 * 1000);
    const endOfDayUTC = new Date(startOfDayUTC.getTime() + 24 * 60 * 60 * 1000);
    const mealsWithFoods = await prisma.meal.findMany({
        where: { 
            userId: userId,
            createdAt: {
                gte: startOfDayUTC,
                lt: endOfDayUTC,
            }
        },
        include: {
            mealFoods: {
                include: {
                food: true
                }
            }
        },
        orderBy: { createdAt: "asc" },
    });
    return mealsWithFoods
}

export const createMealQuery = async (meal: Prisma.MealCreateInput) => {
    return await prisma.meal.create({ data: meal });
};

export const createMealFoodsQuery = async (mealFoods: { mealId: number; foodId: number; servings: number }[]) => {
    return await prisma.mealFoods.createMany({
        data: mealFoods,
    });
};

export const createMealWithFoodsQuery = async (input: Prisma.MealCreateInput) => {
    const createdMeal = await prisma.meal.create({
        data: input,
        include: {
            mealFoods: {
                include: {
                food: true
                }
            }
        }
    });
    return createdMeal
}