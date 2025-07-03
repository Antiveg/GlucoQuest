import { Prisma } from "@/database/prisma-client";
import prisma from "../config/prisma";

export const getUserFoodsQuery = async (uid : number) => {
    const foods = await prisma.food.findMany({
        where: { userId: uid, isArchived: false },
    });
    return foods;
};

export const deleteUserFoodQuery = async (uid : number, fid : number) => {
    const deletedFood = await prisma.food.update({
        where: { id: fid, userId: uid },
        data: { isArchived: true }
    });
    return deletedFood;
};

export const createUserFoodQuery = async (data : Prisma.FoodCreateInput) => {
    const createdFood = await prisma.food.create({ data })
    return createdFood
}