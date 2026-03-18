import db from "../prismaClient.ts";
import { findPortfolioByUserId } from '../utils/portfolioHelpers.js';

const cache = new Map();
const WATCHLIST_CACHE_TTL_MS = 1000 * 60 * 5;
const WATCHLIST_CACHE_KEY = (userId) => `watchlist:user:${userId}`;

function setWatchlistCache(userId, value) {
  cache.set(WATCHLIST_CACHE_KEY(userId), {
    value,
    expiry: Date.now() + WATCHLIST_CACHE_TTL_MS,
  });
}

function getWatchlistCache(userId) {
  const entry = cache.get(WATCHLIST_CACHE_KEY(userId));

  if (!entry || typeof entry !== 'object' || Date.now() > entry.expiry) {
    cache.delete(WATCHLIST_CACHE_KEY(userId));
    return null;
  }

  return entry.value;
}

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
      cache.delete(WATCHLIST_CACHE_KEY(userId));
      await db.watchList.create({
        data: {
          portfolioId,
          symbol,
        }
      })
      return res.status(200).send('Created');
    } else {
      cache.delete(WATCHLIST_CACHE_KEY(userId));
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
  const watchlistCache = getWatchlistCache(userId);

  if (watchlistCache) {
    return res.status(200).send(watchlistCache);
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

    setWatchlistCache(userId, watchList);

    return res.status(200).send(watchList);

  } catch {
    return res.status(503).send('Service unavailable')
  }
};
