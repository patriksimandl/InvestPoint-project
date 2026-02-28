/*
  Warnings:

  - The primary key for the `watchList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[portfolioId,symbol]` on the table `watchList` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "watchList_id_key";

-- AlterTable
ALTER TABLE "watchList" DROP CONSTRAINT "watchList_pkey",
ADD CONSTRAINT "watchList_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "watchList_portfolioId_symbol_key" ON "watchList"("portfolioId", "symbol");
