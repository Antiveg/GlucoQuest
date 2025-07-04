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

export const getTotalCarbsByUserIdQuery = async (userId: number) => {
    const currentDate = new Date();
    const timezoneOffsetMinutes = 420;

  const startOfDayUTC = new Date(
    currentDate.getTime() - timezoneOffsetMinutes * 60 * 1000
  );
  startOfDayUTC.setUTCHours(0, 0, 0, 0);
  const endOfDayUTC = new Date(startOfDayUTC.getTime() + 24 * 60 * 60 * 1000);

  const result = await prisma.meal.aggregate({
    where: {
      userId,
      createdAt: {
        gte: startOfDayUTC,
        lt: endOfDayUTC,
      },
    },
    _sum: {
      totalCarbs: true,
    },
  });

  return result._sum.totalCarbs ?? 0;
};