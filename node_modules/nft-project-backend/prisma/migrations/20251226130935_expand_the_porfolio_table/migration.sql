/*
  Warnings:

  - You are about to drop the column `totlaBalanceHistory` on the `userPortfolio` table. All the data in the column will be lost.
  - Added the required column `cashBalanceHistory` to the `userPortfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalBalanceHistory` to the `userPortfolio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "userPortfolio" DROP COLUMN "totlaBalanceHistory",
ADD COLUMN     "cashBalance" DECIMAL(18,8) NOT NULL DEFAULT 1000,
ADD COLUMN     "cashBalanceHistory" JSONB NOT NULL,
ADD COLUMN     "totalBalanceHistory" JSONB NOT NULL,
ALTER COLUMN "totalBalance" SET DEFAULT 1000;
