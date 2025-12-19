/*
  Warnings:

  - Added the required column `logoURL` to the `Stocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Stocks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stocks" ADD COLUMN     "logoURL" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "data" DROP NOT NULL;

-- CreateTable
CREATE TABLE "lastFetch" (
    "id" SERIAL NOT NULL,
    "lastFetch" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lastFetch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userPortfolio" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "totalBalance" DECIMAL(18,8) NOT NULL,
    "totlaBalanceHistory" JSONB NOT NULL,
    "stockHoldings" JSONB,

    CONSTRAINT "userPortfolio_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userPortfolio" ADD CONSTRAINT "userPortfolio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
