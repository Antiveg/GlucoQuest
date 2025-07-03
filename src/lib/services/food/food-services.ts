import { Food } from "@/database/prisma-client";
import { createUserFoodQuery, deleteUserFoodQuery, getUserFoodsQuery } from "@/lib/data-layers/food";

export async function getUserFoodsService(uid : string) {
    try {
        const Foods = await getUserFoodsQuery(Number(uid));
        return Foods
    } catch (error) {
        console.error("getFoodsService error:", error);
        throw new Error(error instanceof Error ? error.message : "Internal Server Error");
    }
}

export async function deleteUserFoodService(uid : string, fid : string){
    try {
        if(!uid) throw new Error("User ID must be valid")
        if(!fid) throw new Error("Food ID must be valid")

        const deletedFood = await deleteUserFoodQuery(Number(uid), Number(fid));
        return deletedFood
    } catch (error) {
        console.error("getFoodsService error:", error);
        throw new Error(error instanceof Error ? error.message : "Internal Server Error");
    }
}

export async function createUserFoodService(food : Food){
    try {
        const input = {
            ...food,
            user : { connect: { id : Number(food.userId) } },
            userId: undefined,
            id: undefined
        }
        const createdFood = await createUserFoodQuery(input)
        return createdFood
    } catch (error) {
        console.error("getFoodsService error:", error);
        throw new Error(error instanceof Error ? error.message : "Internal Server Error");
    }
}