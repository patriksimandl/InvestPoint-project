/*
  Warnings:

  - The primary key for the `watchList` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "watchList" DROP CONSTRAINT "watchList_pkey",
ADD CONSTRAINT "watchList_pkey" PRIMARY KEY ("portfolioId", "symbol");
