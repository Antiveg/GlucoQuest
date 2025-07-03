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
        include: { foods: true },
        orderBy: { createdAt: "asc" },
    });
    return mealsWithFoods
}