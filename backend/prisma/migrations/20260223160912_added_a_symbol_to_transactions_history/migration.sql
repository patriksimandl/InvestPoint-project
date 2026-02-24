/*
  Warnings:

  - Added the required column `symbol` to the `transactionHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactionHistory" ADD COLUMN     "symbol" TEXT NOT NULL;
