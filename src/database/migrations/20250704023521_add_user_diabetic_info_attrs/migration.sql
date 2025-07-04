/*
  Warnings:

  - You are about to drop the column `ic_ratio` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "ic_ratio",
ADD COLUMN     "correctionFactor" INTEGER NOT NULL DEFAULT 50,
ADD COLUMN     "eatCountdown" INTEGER NOT NULL DEFAULT 30,
ADD COLUMN     "icRatio" DOUBLE PRECISION,
ADD COLUMN     "targetBG" INTEGER NOT NULL DEFAULT 110;
