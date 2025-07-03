/*
  Warnings:

  - You are about to drop the column `mealId` on the `Food` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Food" DROP CONSTRAINT "Food_mealId_fkey";

-- AlterTable
ALTER TABLE "Food" DROP COLUMN "mealId";

-- CreateTable
CREATE TABLE "MealFoods" (
    "id" SERIAL NOT NULL,
    "mealId" INTEGER NOT NULL,
    "foodId" INTEGER NOT NULL,

    CONSTRAINT "MealFoods_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MealFoods" ADD CONSTRAINT "MealFoods_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealFoods" ADD CONSTRAINT "MealFoods_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
