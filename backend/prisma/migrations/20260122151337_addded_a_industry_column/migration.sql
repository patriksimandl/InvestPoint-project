/*
  Warnings:

  - You are about to drop the column `timeStap` on the `transactionHistory` table. All the data in the column will be lost.
  - Added the required column `industry` to the `Stocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `transactionHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `transactionHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stocks" ADD COLUMN     "industry" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "transactionHistory" DROP COLUMN "timeStap",
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "userPortfolio" ALTER COLUMN "cashBalanceHistory" SET DEFAULT '[]',
ALTER COLUMN "totalBalanceHistory" SET DEFAULT '[]';
