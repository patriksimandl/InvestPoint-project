/*
  Warnings:

  - You are about to drop the column `CompanyProfile` on the `Stocks` table. All the data in the column will be lost.
  - Made the column `stockHoldings` on table `userPortfolio` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Stocks" DROP COLUMN "CompanyProfile",
ADD COLUMN     "companyProfile" JSONB;

-- AlterTable
ALTER TABLE "userPortfolio" ALTER COLUMN "stockHoldings" SET NOT NULL,
ALTER COLUMN "stockHoldings" SET DEFAULT '{}';

-- CreateTable
CREATE TABLE "transactionHistory" (
    "id" SERIAL NOT NULL,
    "portfolioId" INTEGER NOT NULL,
    "price" DECIMAL(18,2) NOT NULL,
    "quantity" DECIMAL(18,2) NOT NULL,
    "timeStap" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactionHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transactionHistory" ADD CONSTRAINT "transactionHistory_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "userPortfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
