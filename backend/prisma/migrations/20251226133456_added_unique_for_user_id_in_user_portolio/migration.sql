/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `userPortfolio` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "userPortfolio_userId_key" ON "userPortfolio"("userId");
