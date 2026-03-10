import db from "../prismaClient.ts";

export const addTransactionToHistory = async ({
  portfolioId,
  symbol,
  totalPrice,
  quantity,
  timestamp,
  type
}) => {
  return await db.transactionHistory.create({
    data: {
      portfolioId,
      symbol,
      price: totalPrice,
      quantity,
      timestamp,
      type
    }
  });
};