import db from "../../prismaClient.ts";
import { findPortfolioByUserId } from '../utils/portfolioHelpers.js';

export const getTransactionHistory = async (req, res) => {
  const userId = req.userId;

  try {
    const portfolio = await findPortfolioByUserId(userId, { id: true });

    if (!portfolio) {
      return res.status(404).send('Portfolio not found');
    }

    const transactionHistory = await db.transactionHistory.findMany({
      where: {
        portfolioId: portfolio.id
      },
      orderBy: {
        timestamp: 'desc'
      }
    });

    return res.status(200).send(transactionHistory);

  } catch (err) {
    return res.status(503).send('Service unavailable');
  }
};
