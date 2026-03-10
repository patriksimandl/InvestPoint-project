import db from "../prismaClient.ts";
import { findPortfolioByUserId } from '../utils/portfolioHelpers.js';

const cache = new Map();

export const toggleWatchList = async (req, res) => {
  const { userId } = req;
  const { symbol } = req.body

  try {
    const portfolio = await findPortfolioByUserId(userId);
    if (!portfolio) {
      return res.status(404).send('Portfolio not found');
    }

    const portfolioId = portfolio.id;

    const isSymbolOnWatchList = await db.watchList.findUnique({
      where: {
        portfolioId_symbol: {
          portfolioId,
          symbol
        }
      }
    })

    if (!isSymbolOnWatchList) {
      cache.delete(`watchList:${userId}`);
      await db.watchList.create({
        data: {
          portfolioId,
          symbol,
        }
      })
      return res.status(200).send('Created');
    } else {
      cache.delete(`watchList:${userId}`);
      await db.watchList.delete({
        where: {
          portfolioId_symbol: {
            portfolioId,
            symbol
          }
        }
      })
      return res.sendStatus(204);
    }

  } catch (err) {
    return res.status(503).send('Service unavailable');
  }
};

export const getWatchList = async (req, res) => {
  const { userId } = req;

  if (cache.has(`watchList:${userId}`)) {
    return res.status(200).send(cache.get(`watchList:${userId}`));
  }

  try {
    const portfolio = await findPortfolioByUserId(userId);
    if (!portfolio) {
      return res.status(404).send('Portfolio not found');
    }
    const portfolioId = portfolio.id;

    const watchList = await db.watchList.findMany({
      where: {
        portfolioId
      }
    })

    cache.set(`watchList:${userId}`, watchList);

    return res.status(200).send(watchList);

  } catch {
    return res.status(503).send('Service unavailable')
  }
};
